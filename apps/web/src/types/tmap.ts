export interface MapOptions {
  zoomControl?: boolean;
}

export interface NewAddress {
  centerLat: string;
  centerLon: string;
  frontLat: string;
  frontLon: string;
  fullAddressRoad: string;
}

export interface NewAddressList {
  newAddress: NewAddress[];
}

export interface Poi {
  newAddressList: NewAddressList;
  id: string;
  pkey: string;
  name: string;
  noorLat: string;
  noorLon: string;
}

export interface Pois {
  poi: Poi[];
}

export interface SearchPoiInfo {
  totalCount: string;
  count: string;
  page: string;
  pois: Pois;
}

export interface TMap {
  setCenter: (latLng: TMapLatLng) => void;
  setZoomLimit: (minZoom: number, maxZoom: number) => void;
  setZoom: (zoomLevel: number) => void;
  setOptions: ({ zoomControl }: MapOptions) => void;
  destroy: () => void;
  on: (eventType: EventType, listener: (event: TMapEvent) => void) => void;
}

export type EventType = "Click";

export interface TMapEvent {
  data: {
    lngLat: TMapLatLng;
  };
}

export interface TMapMarkerOptions {
  map: TMap;
  position: TMapLatLng;
  iconHTML?: string;
  iconSize?: TMapSize;
  label?: string;
  icon?: string;
  draggable?: boolean;
  clickable?: boolean;
  zIndex?: number;
  opacity?: number;
  title?: string;
}

export interface TMapMarkerClickEvent {
  _marker_data: {
    options: TMapMarkerOptions;
  };
}

export interface TMapLatLng {
  lat: () => number;
  lng: () => number;
  _lat: number;
  _lng: number;
}

export interface TMapMarker {
  setMap: (map: TMap | null) => void;
  getPosition: () => TMapLatLng;
  setPosition: (latLng: TMapLatLng) => void;
  setLabel: (HTML: string) => void;
  on: (eventType: EventType, listener: (event: TMapEvent) => void) => void;
}

export interface TMapSize {
  _width: number;
  _height: number;
}

export interface TmapAddressInfo {
  fullAddress: string;
}

export interface TmapResponse {
  searchPoiInfo: SearchPoiInfo;
}

export interface TmapReverseGeocodingResponse {
  addressInfo: TmapAddressInfo;
}

// 공식 문서 기반 타입 정의
export interface TMapLatLngBounds {
  getCenter(): TMapLatLng;
  getNorthEast(): TMapLatLng;
  getSouthWest(): TMapLatLng;
  contains(latLng: TMapLatLng): boolean;
  intersects(bounds: TMapLatLngBounds): boolean;
  extend(latLng: TMapLatLng): TMapLatLngBounds;
  union(bounds: TMapLatLngBounds): TMapLatLngBounds;
  isEmpty(): boolean;
  getWidth(): number;
  getHeight(): number;
  toString(): string;
}

export interface TMapPoint {
  getX(): number;
  getY(): number;
  setX(x: number): void;
  setY(y: number): void;
  clone(): TMapPoint;
  distanceTo(point: TMapPoint): number;
  equals(point: TMapPoint): boolean;
  toString(): string;
}
