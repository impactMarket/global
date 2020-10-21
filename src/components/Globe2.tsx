import React from 'react';
import mapboxgl from 'mapbox-gl';
import Api from '../services/api';
import config from '../config';

mapboxgl.accessToken = config.mapBoxApiKey;

interface IGlobeState {
    lng: number;
    lat: number;
    zoom: number;
    heatMaxZoom: number;
    intensity1: number;
    intensity2: number;
    intensity3: number;
    intensity4: number;
    color1: string;
    color2: string;
    color3: string;
    color4: string;
    color5: string;
    color6: string;
    opacity1: number;
    opacity2: number;
    opacity3: number;
    opacity4: number;
}
export class Globe2 extends React.Component<{}, IGlobeState> {
    private mapContainer: any = undefined;
    private map: any = undefined;
    constructor(props: any) {
        super(props);
        this.state = {
            lng: 0,
            lat: 0,
            zoom: 2,
            //
            heatMaxZoom: 20,
            intensity1: 1,
            intensity2: 0.5,
            intensity3: 7,
            intensity4: 2,
            color1: 'rgba(33,102,172,0)',
            color2: '#78d05d',
            color3: '#ebec76',
            color4: '#f2aa7f',
            color5: '#ef8a62',
            color6: '#b2182b',
            opacity1: 7,
            opacity2: 1,
            opacity3: 20,
            opacity4: 1,
        };
    }

    updateLayer = () => {
        const {
            heatMaxZoom,
            intensity1,
            intensity2,
            intensity3,
            intensity4,
            color1,
            color2,
            color3,
            color4,
            color5,
            color6,
            opacity1,
            opacity2,
            opacity3,
            opacity4,
        } = this.state;
        this.map.removeLayer('claims-heat');
        this.map.addLayer(
            {
                'id': 'claims-heat',
                'type': 'heatmap',
                'source': 'claims',
                'maxzoom': heatMaxZoom,
                'paint': {
                    // Increase the heatmap color weight weight by zoom level
                    // heatmap-intensity is a multiplier on top of heatmap-weight
                    'heatmap-intensity': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        intensity1,
                        intensity2,
                        intensity3,
                        intensity4
                    ],
                    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                    // Begin color ramp at 0-stop with a 0-transparancy color
                    // to create a blur-like effect.
                    'heatmap-color': [
                        'interpolate',
                        ['linear'],
                        ['heatmap-density'],
                        0,
                        color1,
                        0.2,
                        color2,
                        0.4,
                        color3,
                        0.6,
                        color4,
                        0.8,
                        color5,
                        1,
                        color6,
                    ],
                    // Adjust the heatmap radius by zoom level
                    'heatmap-radius': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        0,
                        2,
                        9,
                        20
                    ],
                    // Transition from heatmap to circle layer by zoom level
                    'heatmap-opacity': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        opacity1,
                        opacity2,
                        opacity3,
                        opacity4,
                    ]
                }
            },
            'waterway-label'
        );
    }

    async componentDidMount() {
        const {
            heatMaxZoom,
            intensity1,
            intensity2,
            intensity3,
            intensity4,
            color1,
            color2,
            color3,
            color4,
            color5,
            color6,
            opacity1,
            opacity2,
            opacity3,
            opacity4,
        } = this.state;
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/outdoors-v11',
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
        this.map.fitBounds(bounds);

        this.map.on('move', () => {
            this.setState({
                lng: this.map.getCenter().lng,
                lat: this.map.getCenter().lat,
                zoom: this.map.getZoom()
            });
        });

        this.map.on('load', () => {
            // Add a geojson point source.
            // Heatmap layers also work with a vector tile source.
            this.map.addSource('claims', {
                'type': 'geojson',
                'data': mapData as any
            });

            this.map.addLayer(
                {
                    'id': 'claims-heat',
                    'type': 'heatmap',
                    'source': 'claims',
                    'maxzoom': heatMaxZoom,
                    'paint': {
                        // Increase the heatmap color weight weight by zoom level
                        // heatmap-intensity is a multiplier on top of heatmap-weight
                        'heatmap-intensity': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            intensity1,
                            intensity2,
                            intensity3,
                            intensity4
                        ],
                        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                        // Begin color ramp at 0-stop with a 0-transparancy color
                        // to create a blur-like effect.
                        'heatmap-color': [
                            'interpolate',
                            ['linear'],
                            ['heatmap-density'],
                            0,
                            color1,
                            0.2,
                            color2,
                            0.4,
                            color3,
                            0.6,
                            color4,
                            0.8,
                            color5,
                            1,
                            color6,
                        ],
                        // Adjust the heatmap radius by zoom level
                        'heatmap-radius': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            0,
                            2,
                            9,
                            20
                        ],
                        // Transition from heatmap to circle layer by zoom level
                        'heatmap-opacity': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            opacity1,
                            opacity2,
                            opacity3,
                            opacity4,
                        ]
                    }
                },
                'waterway-label'
            );

            // this.map.addLayer(
            //     {
            //         'id': 'claims-point',
            //         'type': 'circle',
            //         'source': 'claims',
            //         'minzoom': 7,
            //         'paint': {
            //             // Size circle radius by earthquake magnitude and zoom level
            //             'circle-radius': 4,
            //             // Color circle by earthquake magnitude
            //             'circle-color': 'rgb(178,24,43)',
            //             'circle-stroke-color': 'white',
            //             'circle-stroke-width': 1,
            //             // Transition from heatmap to circle layer by zoom level
            //             'circle-opacity': [
            //                 'interpolate',
            //                 ['linear'],
            //                 ['zoom'],
            //                 7,
            //                 0,
            //                 8,
            //                 1
            //             ]
            //         }
            //     },
            //     'waterway-label'
            // );
        });


    }

    render() {
        const {
            heatMaxZoom,
            intensity1,
            intensity2,
            intensity3,
            intensity4,
            color1,
            color2,
            color3,
            color4,
            color5,
            color6,
            opacity1,
                            opacity2,
                            opacity3,
                            opacity4,
        } = this.state;
        return (
            <div>
                <div ref={el => this.mapContainer = el} style={{
                    borderRadius: '8px',
                    height: 500,
                }} />
                {/* <input type="color" value={color1} onChange={(e) => this.setState({color1: e.target.value})} /> */}
                Max zoom to shown heatmap
                <input type="number" value={heatMaxZoom} onChange={(e) => this.setState({ heatMaxZoom: parseInt(e.target.value) })} />
                <br />
                <br />
                Increase the heatmap color weight weight by zoom level
                <input type="number" value={intensity1} step="0.01" onChange={(e) => this.setState({ intensity1: parseFloat(e.target.value) })} />
                <input type="number" value={intensity2} step="0.01" onChange={(e) => this.setState({ intensity2: parseFloat(e.target.value) })} />
                <input type="number" value={intensity3} step="0.01" onChange={(e) => this.setState({ intensity3: parseFloat(e.target.value) })} />
                <input type="number" value={intensity4} step="0.01" onChange={(e) => this.setState({ intensity4: parseFloat(e.target.value) })} />
                <br />
                <br />
                Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                <input type="color" value={color2} onChange={(e) => this.setState({ color2: e.target.value })} />
                <input type="color" value={color3} onChange={(e) => this.setState({ color3: e.target.value })} />
                <input type="color" value={color4} onChange={(e) => this.setState({ color4: e.target.value })} />
                <input type="color" value={color5} onChange={(e) => this.setState({ color5: e.target.value })} />
                <input type="color" value={color6} onChange={(e) => this.setState({ color6: e.target.value })} />
                <br />
                <br />
                Transition from heatmap to circle layer by zoom level
                <input type="number" value={opacity1} step="0.01" onChange={(e) => this.setState({ opacity1: parseFloat(e.target.value) })} />
                <input type="number" value={opacity2} step="0.01" onChange={(e) => this.setState({ opacity2: parseFloat(e.target.value) })} />
                <input type="number" value={opacity3} step="0.01" onChange={(e) => this.setState({ opacity3: parseFloat(e.target.value) })} />
                <input type="number" value={opacity4} step="0.01" onChange={(e) => this.setState({ opacity4: parseFloat(e.target.value) })} />
                <br />
                <br />
                <input type="submit" value="update" onClick={this.updateLayer} />
            </div>
        )
    }

}
