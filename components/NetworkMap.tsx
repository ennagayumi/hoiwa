"use client";

import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import worldAtlas from "world-atlas/countries-110m.json";
import type { FeatureCollection } from "geojson";
import { useLanguage } from "@/context/LanguageContext";

type Coordinate = [number, number];
type Point = { key: string; point: Coordinate; kind: "origin" | "supply" | "shipment"; label: [number, number, "start" | "middle" | "end"] };

const topology = worldAtlas as unknown as { objects: { countries: Parameters<typeof feature>[1] } };
const countries = feature(
  worldAtlas as unknown as Parameters<typeof feature>[0],
  topology.objects.countries,
) as unknown as FeatureCollection;
// 太平洋を中心に置く（日本で一般的な向き）。南北アメリカへの線が地図の端で切れない。
const projection = geoNaturalEarth1().rotate([-150, 0]).fitExtent([[18, 18], [882, 482]], countries);
const path = geoPath(projection);

// 出荷先は home.shipments（生産基地の公開記録）の仕向地。label は [dx, dy, 揃え]。
const points: Point[] = [
  { key: "cn", point: [117.2, 39.1], kind: "origin", label: [-10, -9, "end"] },
  { key: "jp", point: [139.7, 35.7], kind: "supply", label: [10, -9, "start"] },
  { key: "id", point: [106.8, -6.2], kind: "shipment", label: [-9, 16, "end"] },
  { key: "cl", point: [-71.6, -33.0], kind: "shipment", label: [-8, 16, "end"] },
  { key: "br", point: [-46.3, -24.0], kind: "shipment", label: [-6, -10, "end"] },
  { key: "na", point: [-100, 40], kind: "shipment", label: [0, -12, "middle"] },
  { key: "eu", point: [10, 50], kind: "shipment", label: [9, -9, "start"] },
];

function arc(from: Coordinate, to: Coordinate) {
  const a = projection(from);
  const b = projection(to);
  if (!a || !b) return "";
  const [mx, my] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const lift = Math.hypot(b[0] - a[0], b[1] - a[1]) * 0.22;
  return `M${a[0]} ${a[1]} Q${mx} ${my - lift} ${b[0]} ${b[1]}`;
}

const origin = points[0];
const routes = points.slice(1).map((target) => ({ key: target.key, kind: target.kind, d: arc(origin.point, target.point) }));

export default function NetworkMap() {
  const { t } = useLanguage();
  const labels = t.network.mapLabels as Record<string, string>;

  return (
    <div className="network-map" role="img" aria-label={t.network.mapAria}>
      <svg viewBox="0 0 900 500" aria-hidden="true">
        <g className="network-map__countries">
          {countries.features.map((country, index) => (
            <path key={String(country.id ?? index)} d={path(country) ?? ""} />
          ))}
        </g>
        <g className="network-map__routes">
          {routes.map((route) => (
            <path key={route.key} className={`network-map__route--${route.kind}`} d={route.d} />
          ))}
        </g>
        <g className="network-map__nodes">
          {points.map(({ key, point, kind, label: [dx, dy, anchor] }) => {
            const projected = projection(point);
            if (!projected) return null;
            return (
              <g key={key} className={`network-map__node--${kind}`} transform={`translate(${projected[0]} ${projected[1]})`}>
                <circle r={kind === "shipment" ? 3.5 : 5} />
                {kind !== "shipment" && <circle className="network-map__pulse" r="11" />}
                <text x={dx} y={dy} textAnchor={anchor}>
                  {labels[key]}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      <ul className="network-map__legend">
        <li className="network-map__legend--supply">{t.network.mapLegend.supply}</li>
        <li className="network-map__legend--shipment">{t.network.mapLegend.shipment}</li>
      </ul>
    </div>
  );
}
