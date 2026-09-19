"use client";

import { geoInterpolate, geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import worldAtlas from "world-atlas/countries-110m.json";
import type { FeatureCollection, LineString } from "geojson";
import { useLanguage } from "@/context/LanguageContext";

type Coordinate = [number, number];

const topology = worldAtlas as unknown as { objects: { countries: Parameters<typeof feature>[1] } };
const countries = feature(
  worldAtlas as unknown as Parameters<typeof feature>[0],
  topology.objects.countries,
) as unknown as FeatureCollection;
const projection = geoNaturalEarth1().fitExtent([[18, 18], [882, 482]], countries);
const path = geoPath(projection);

const regionPoints = [
  { key: "cn" as const, point: [110, 34] as Coordinate, origin: true },
  { key: "jp" as const, point: [139.7, 35.7] as Coordinate, origin: false },
  { key: "sea" as const, point: [105, 8] as Coordinate, origin: false },
  { key: "af" as const, point: [24, 1] as Coordinate, origin: false },
] as const;

function route(from: Coordinate, to: Coordinate): LineString {
  const interpolate = geoInterpolate(from, to);
  return { type: "LineString", coordinates: Array.from({ length: 41 }, (_, index) => interpolate(index / 40)) };
}

// Supply flows radiate from the sourcing base in China; Japan also links onward to the demand regions.
const [china, japan, seAsia, africa] = regionPoints;
const connections = [
  route(china.point, japan.point),
  route(china.point, seAsia.point),
  route(china.point, africa.point),
  route(japan.point, seAsia.point),
];

export default function NetworkMap() {
  const { t } = useLanguage();

  return (
    <div className="network-map" role="img" aria-label={t.network.mapAria}>
      <svg viewBox="0 0 900 500" aria-hidden="true">
        <g className="network-map__countries">
          {countries.features.map((country, index) => (
            <path key={String(country.id ?? index)} d={path(country) ?? ""} />
          ))}
        </g>
        <g className="network-map__routes">
          {connections.map((connection, index) => (
            <path key={index} d={path(connection) ?? ""} />
          ))}
        </g>
        <g className="network-map__nodes">
          {regionPoints.map(({ key, point, origin }) => {
            const label = t.network.mapLabels[key];
            const projected = projection(point);
            if (!projected) return null;
            // Keep the China origin label to the left of the pin so it stays readable next to Japan.
            const labelX = origin ? -11 : 11;
            return (
              <g key={key} className={origin ? "network-map__node--origin" : undefined} transform={`translate(${projected[0]} ${projected[1]})`}>
                <circle r="5" />
                <circle className="network-map__pulse" r="11" />
                <text x={labelX} y={origin ? 22 : -9} textAnchor={origin ? "end" : "start"}>
                  {label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
