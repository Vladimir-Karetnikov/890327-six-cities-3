import * as React from "react";
import * as leaflet from "leaflet";
import {connect} from "react-redux";
import {getCurrentCity, getHoveredCard} from "../../reducer/data/selectors";
import {City, Offer} from "../../interfaces";

interface Props {
  city: City;
  hoveredCard: Offer;
  offersCoords: Array<[number, number]>;
}

class Map extends React.PureComponent<Props, {}> {
  private _ref: React.RefObject<HTMLDivElement>;
  map: leaflet.Map;
  _markersLayer: leaflet.LayerGroup;

  constructor(props) {
    super(props);
    this._ref = React.createRef();
  }

  componentDidMount() {
    this._initCity();
  }

  componentDidUpdate(prevProps) {
    if (this.props.hoveredCard.coords !== prevProps.hoveredCard.coords || this.props.city !== prevProps.city) {
      this._markersLayer.clearLayers();
      this.map.setView(this.props.city.coords, this.props.city.zoom);
      this._addMarkers();
    }
  }

  _getIcon() {
    return leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 40],
    });
  }

  _getActiveIcon() {
    return leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: [30, 40],
    });
  }

  _initCity() {
    const {city} = this.props;

    this.map = leaflet.map(this._ref.current, {
      center: city.coords,
      zoom: city.zoom,
      zoomControl: false,
      scrollWheelZoom: false
    });

    this.map.setView(city.coords, city.zoom);
    leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }).addTo(this.map);

    this._addMarkers();
  }

  _addMarkers() {
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 40]
    });

    const activeIcon = leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: [30, 40]
    });

    const {offersCoords, hoveredCard} = this.props;
    this._markersLayer = leaflet.layerGroup().addTo(this.map);

    offersCoords.map((coords) => {
      leaflet
        .marker(coords, {icon: coords === hoveredCard.coords ? activeIcon : icon})
        .addTo(this._markersLayer);
    });
  }


  render() {
    return (
      <div id="map" ref={this._ref} style={{width: `100%`, height: `100%`}}></div>
    );
  }
}

const mapStateToProps = (state) => ({
  hoveredCard: getHoveredCard(state),
  city: getCurrentCity(state)
});

export {Map};
export default connect(mapStateToProps)(Map);
