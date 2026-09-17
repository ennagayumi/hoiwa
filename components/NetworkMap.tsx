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
  { key: "jp" as const, point: [139.7, 35.7] as Coordinate },
  { key: "sea" as const, point: [105, 8] as Coordinate },
  { key: "af" as const, point: [24, 1] as Coordinate },
] as const;

function route(from: Coordinate, to: Coordinate): LineString {
  const interpolate = geoInterpolate(from, to);
  return { type: "LineString", coordinates: Array.from({ length: 41 }, (_, index) => interpolate(index / 40)) };
}

const connections = [
  route(regionPoints[2].point, regionPoints[0].point),
  route(regionPoints[1].point, regionPoints[0].point),
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
          {regionPoints.map(({ key, point }) => {
            const label = t.network.mapLabels[key];
            const projected = projection(point);
            if (!projected) return null;
            return (
              <g key={key} transform={`translate(${projected[0]} ${projected[1]})`}>
                <circle r="5" />
                <circle className="network-map__pulse" r="11" />
                <text x="11" y="-9">
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
