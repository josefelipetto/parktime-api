import React from 'react';
import PropTypes from 'prop-types'

import ReactMapGL from 'react-map-gl';
import { Source, Layer } from 'react-map-gl';


import {unclusteredPointLayer,clusterCountLayer, clusterLayer,iconCarSymbol} from './layers';
import {getSectors} from '../../services/locations';

const state = {
  viewport: {
    // width: "100%",
    // height: "100vh",
    latitude: -25.451388,
    longitude: -49.25155784,
    zoom: 16
  }
};



function ParkingMap ({ parkingData, onFeatureClick }) {

  const sourceRef = React.useRef(null);
  const mapRef = React.useRef();

  const [viewport, setViewport] = React.useState(state.viewport);

  const onViewportChange = viewport => setViewport(viewport);

  const onClick = event => {
    
    // const feature = event.features[0];
    // const clusterId = feature.properties.cluster_id;
    const featuresArr = mapRef
    .current
    .queryRenderedFeatures(event.point, { layers: ['unclustered-point'] });

    if(featuresArr.length){
      getSectors(featuresArr[0].properties.id)
      .then(res => { onFeatureClick && onFeatureClick(res.data)})
      .catch(err => console.error(err))
    }

  };



  return (
    <ReactMapGL
      {...viewport}  
      width="100%"
      height="100vh"
      ref={mapRef}
      mapStyle="mapbox://styles/mapbox/light-v9" 
      mapboxApiAccessToken="pk.eyJ1IjoidGlhZ29hcG9sbyIsImEiOiJjazgzZWFsdWcwcnFqM3Nud21wcGNxbDN5In0.QxDZZ37Y2EPUZ9XBsCgE2g"
      onViewportChange={onViewportChange}
      onClick={onClick}
    >
      <Source 
        id="cases" 
        type="geojson" 
        data={parkingData}
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
        ref={sourceRef}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
        <Layer {...iconCarSymbol} />        
      </Source>
    </ReactMapGL>
  );
};

ParkingMap.propTypes = {
  parkingData: PropTypes.object
};

ParkingMap.defaultProps = {
  parkingData: {
    type: 'FeatureCollection',
    features: []
  },
};

export default ParkingMap;