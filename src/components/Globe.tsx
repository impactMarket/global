import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import Api from '../services/api';


interface IGlobeState {
    mapHidden: boolean;
    layerHidden: boolean;
    addressPoints: (string | number | null)[][];
    radius: number;
    blur: number;
    max: number;
}
export class Globe extends React.Component<{}, IGlobeState> {

    state = {
        mapHidden: false,
        layerHidden: false,
        addressPoints: [[]],
        radius: 20,
        blur: 1,
        max: 0.1,
    };

    componentDidMount() {
        Api.getAllClaimLocation().then((claims) => {
            this.setState({ addressPoints: claims.map((c) => ([c.gps.latitude, c.gps.longitude, "1"])) });
        });
    }

    render() {
        const gradient = {
            0.1: '#89BDE0', 0.2: '#96E3E6', 0.4: '#82CEB6',
            0.6: '#FAF3A5', 0.8: '#F5D98B', '1.0': '#DE9A96'
        };

        return (
            <div>
                <Map center={[0, 0]} zoom={13}>
                    {!this.state.layerHidden &&
                        <HeatmapLayer
                            fitBoundsOnLoad
                            fitBoundsOnUpdate
                            points={this.state.addressPoints}
                            longitudeExtractor={(m: any) => m[1]}
                            latitudeExtractor={(m: any) => m[0]}
                            gradient={gradient}
                            intensityExtractor={(m: any) => parseFloat(m[2])}
                            radius={this.state.radius}
                            blur={this.state.blur}
                            max={this.state.max}
                        />
                    }
                    <TileLayer
                        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                </Map>
                {/* <input
                    type="button"
                    value="Toggle Map"
                    onClick={() => this.setState({ mapHidden: !this.state.mapHidden })}
                />
                <input
                    type="button"
                    value="Toggle Layer"
                    onClick={() => this.setState({ layerHidden: !this.state.layerHidden })}
                />
                <div>
                    Radius
                    <input
                        type="range"
                        min={1}
                        max={40}
                        value={this.state.radius}
                        onChange={(e) => this.setState({ radius: parseInt(e.currentTarget.value) })}
                    /> {this.state.radius}
                </div>

                <div>
                    Blur
                    <input
                        type="range"
                        min={1}
                        max={20}
                        value={this.state.blur}
                        onChange={(e) => this.setState({ blur: parseInt(e.currentTarget.value) })}
                    /> {this.state.blur}
                </div>

                <div>
                    Max
                    <input
                        type="range"
                        min={0.1}
                        max={3}
                        step={0.1}
                        value={this.state.max}
                        onChange={(e) => this.setState({ max: parseFloat(e.currentTarget.value) })}
                    /> {this.state.max}
                </div> */}
            </div>
        );
    }

}
