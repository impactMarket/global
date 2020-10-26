import React from 'react';
import mapboxgl from 'mapbox-gl';
import Api from '../services/api';
import config from '../config';

mapboxgl.accessToken = config.mapBoxApiKey;

interface IGlobeState {
    lng: number;
    lat: number;
    zoom: number;
}
export class Globe2 extends React.Component<{}, IGlobeState> {
    private mapContainer: any = undefined;
    constructor(props: any) {
        super(props);
        this.state = {
            lng: 0,
            lat: 0,
            zoom: 12,
        };
    }


    async componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: config.mapBoxStyle,
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        const claims = await Api.getAllClaimLocation();
        const mapData = {
            type: "FeatureCollection",
            features: claims.map((c) => (
                {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [c.gps.longitude, c.gps.latitude]
                    }
                }
            ))
        }
        const bounds = new mapboxgl.LngLatBounds();
        mapData.features.forEach((feature) => {
            bounds.extend(feature.geometry.coordinates as any);
        });
        bounds.setNorthEast({ lng: bounds.getNorthEast().lng, lat: bounds.getNorthEast().lat + 2 })
        bounds.setSouthWest({ lng: bounds.getSouthWest().lng, lat: bounds.getSouthWest().lat - 2 })
        map.fitBounds(bounds);
        map.setMaxZoom(12);

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng,
                lat: map.getCenter().lat,
                zoom: map.getZoom()
            });
        });

        map.on('load', () => {
            // Add a geojson point source.
            // Heatmap layers also work with a vector tile source.
            map.addSource('claims', {
                'type': 'geojson',
                'data': mapData as any
            });

            map.addLayer(
                {
                    'id': 'claims-heat',
                    'type': 'heatmap',
                    'source': 'claims',
                    'maxzoom': 11,
                    'paint': {
                        // Increase the heatmap color weight weight by zoom level
                        // heatmap-intensity is a multiplier on top of heatmap-weight
                        'heatmap-intensity': 1,
                        'heatmap-weight': 1,
                        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                        // Begin color ramp at 0-stop with a 0-transparancy color
                        // to create a blur-like effect.
                        'heatmap-color': [
                            "interpolate",
                            ["linear"],
                            ["heatmap-density"],
                            0,
                            "rgba(0, 0, 255, 0)",
                            0.12,
                            "hsl(111, 72%, 87%)",
                            0.35,
                            "hsl(82, 87%, 60%)",
                            0.6,
                            "hsl(65, 96%, 54%)",
                            0.85,
                            "hsl(49, 100%, 58%)",
                            0.99,
                            "hsl(10, 94%, 56%)"
                        ],
                        // Adjust the heatmap radius by zoom level
                        'heatmap-radius': [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            0,
                            1,
                            12,
                            20
                        ],
                        // Transition from heatmap to circle layer by zoom level
                        'heatmap-opacity': [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            0,
                            0.8,
                            12,
                            0.5
                        ]
                    }
                },
                'waterway-label'
            );
        });


    }

    render() {
        return (
            <div>
                <div ref={el => this.mapContainer = el} style={{
                    borderRadius: '8px',
                    height: 500,
                }} />
            </div>
        )
    }

}
