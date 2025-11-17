import { LatLngExpression } from "leaflet";
import React, { useEffect, useId } from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../../field";
import { Input } from "../../input";
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
import { TooltipFieldLabel } from "../utils/tooltip-field-label";

export type GeoPointFieldProps = {
	mapControls?: React.ComponentProps<typeof MapDrawControl>;
	mapControlComponents?: React.ReactNode[];
};

type GeoPoint = { lat: number; lng: number };

const GeoPointField = (
	props: GeoPointFieldProps = {
		mapControlComponents: [<MapDrawMarker />],
	},
) => {
	const field = useFieldContext<GeoPoint>();
	const [currentPosition, setCurrentPosition] = React.useState<GeoPoint | null>(
		null,
	);
	const { L } = useLeaflet();

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setCurrentPosition({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
			if (!field.state.value) {
				field.setValue({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			}
		});
	}, [field]);

	const center = currentPosition;

	if (!center) {
		return <div>Loading map...</div>;
	}

	return (
		<Map id={field.name} center={field.state.value ?? [center.lat, center.lng]}>
			<MapTileLayer
				name={field.name}
				url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
			/>
			{field.state.value && <MapMarker position={field.state.value} />}
			<MapDrawControl
				onLayersChange={(layers) => {
					layers.eachLayer((layer) => {
						if (layer instanceof L!.Marker) {
							const latLng = layer.getLatLng();
							field.setValue({ lat: latLng.lat, lng: latLng.lng });
						}
					});
				}}
				{...props.mapControls}
			>
				{props.mapControlComponents}
				<MapDrawEdit />
				<MapDrawDelete />
				<MapDrawUndo />
			</MapDrawControl>
		</Map>
	);
};

export default GeoPointField;
