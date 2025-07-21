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
  getBounds: () => TMapGetBounds;
  destroy: () => void;
  on: (eventType: EventType, listener: (event: TMapEvent) => void) => void;
}

interface TMapGetBounds {
  _ne: {
    _lat: number;
    _lng: number;
  };
  _sw: {
    _lat: number;
    _lng: number;
  };
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
  color?: string;
  anchor?: string;
  icon?: string;
  zIndex?: number;
  iconHTML?: string;
  iconSize?: TMapSize;
  offset?: TMapPoint;
  label?: string;
  labelSize?: string;
  opacity?: number;
  visible?: boolean;
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
  getPosition: () => TMapLatLng;
  getOffset: () => TMapPoint;
  getIconSize: () => TMapSize;
  getIcon: () => string;
  setMap: (map: TMap | null) => void;
  setPosition: (latLng: TMapLatLng) => void;
  setVisible: (visible: boolean) => void;
  on: (eventType: EventType, listener: (event: TMapMarkerClickEvent) => void) => void;
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

export interface TMapPoi {
  detailBizName: string;
  name: string;
  id: string;
  newAddressList: {
    newAddress: {
      frontLat: string;
      frontLon: string;
      fullAddressRoad: string;
    }[];
  };
}
