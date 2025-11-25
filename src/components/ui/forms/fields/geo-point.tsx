import React, { useEffect, useId, useRef } from "react";
import {
	Map,
	MapDrawControl,
	MapDrawDelete,
	MapDrawEdit,
	MapDrawMarker,
	MapDrawUndo,
	MapMarker,
	MapTileLayer,
	useLeaflet,
} from "../../map";
import { useFieldContext } from "..";

export type GeoPointFieldProps = {
	mapControls?: React.ComponentProps<typeof MapDrawControl>;
	mapControlComponents?: React.ReactNode[];
};

type GeoPoint = { lat: number; lon: number };

const GeoPointField = (props: GeoPointFieldProps) => {
	const { L } = useLeaflet();

	let map = useRef<L.Map>(null);
	const id = useId();

	const field = useFieldContext<GeoPoint>();
	const [currentPosition, setCurrentPosition] = React.useState<GeoPoint | null>(
		null,
	);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			const geoPoint = {
				lat: position.coords.latitude,
				lon: position.coords.longitude,
			};
			setCurrentPosition(geoPoint);
		});
	}, []);

	useEffect(() => {
		if (!field.state.value && currentPosition) {
			field.handleChange(currentPosition);
		}
	}, [currentPosition]);

	useEffect(() => {
		if (!map.current || !L) return;

		const handleMapClick = (e: L.LeafletMouseEvent) => {
			const geoPoint = { lat: e.latlng.lat, lon: e.latlng.lng };
			field.handleChange(geoPoint);
		};

		map.current.on("click", handleMapClick);

		return () => {
			map.current?.off("click", handleMapClick);
		};
	}, [map.current, L]);

	if (!currentPosition) {
		return <div>Loading map...</div>;
	}

	return (
		<Map
			ref={map}
			id={id}
			center={
				field.state.value
					? [field.state.value.lat, field.state.value.lon]
					: [currentPosition?.lat || 0, currentPosition?.lon || 0]
			}
		>
			<MapTileLayer
				name={field.name}
				url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
			/>
			{field.state.value && (
				<MapMarker
					position={{ lat: field.state.value.lat, lng: field.state.value.lon }}
				/>
			)}
			<MapDrawControl
				onLayersChange={(layers) => {
					layers.eachLayer((layer) => {
						if (layer instanceof L!.Marker) {
							const latLng = layer.getLatLng();
							field.handleChange({ lat: latLng.lat, lon: latLng.lng });
						}
					});
				}}
				{...props.mapControls}
			>
				{props.mapControlComponents}
				{/* <MapDrawMarker /> */}
				<MapDrawEdit />
				<MapDrawDelete />
				<MapDrawUndo />
			</MapDrawControl>
		</Map>
	);
};

export default GeoPointField;
