import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";
import "./../CSS/Legend.css";

const legendHtmlFor = () =>
	[
		"<h3>Sentimental Legend</h1>",
		'<p><i style="background: #ffff66"></i>  Mixed </p>',
		'<p><i style="background: #e0544a"></i>  Negative</p>',
		'<p><i style="background: #3fb0cf"></i>  Neutral</p>',
		'<p><i style="background: #53c653"></i>  Positive</p>',
	].join("\n");

class Legend extends MapControl {
	createLeafletElement(props) {}

	componentDidMount() {
		const legend = L.control({ position: "bottomright" });

		legend.onAdd = () => {
			const div = L.DomUtil.create("div", "info legend");
			div.innerHTML = legendHtmlFor("title", "description");
			return div;
		};

		const { map } = this.props.leaflet;
		legend.addTo(map);
	}
}

export default withLeaflet(Legend);
