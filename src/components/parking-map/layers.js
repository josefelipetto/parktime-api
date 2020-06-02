
export const baixo = ['==', ['get', 'score'], 'baixo'];
export const medio = ['==', ['get', 'score'], 'medio'];
export const alto = ['==', ['get', 'score'], 'alto'];

export const clusterLayer = {
  id: 'clusters',
  type: 'circle',
  source: 'cases',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
    'circle-radius': ['step', ['get', 'point_count'], 22, 100, 25, 750, 28]
  }
};

export const clusterCountLayer = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'cases',
  filter: ['has', 'point_count'],
  paint:{
    'text-color':'#000',
  },
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12,
    'text-allow-overlap': false,
  }
};

export const iconCarSymbol = {
  id: 'icon-car',
  type: 'symbol',
  source: 'cases',
  filter: ['!', ['has', 'point_count']],
  layout: {
    'icon-image': 'car-15',
    'text-field': '{name}',
    'icon-size': 1,
    'text-size': 12,
    'text-allow-overlap': true,
  },
  paint:{
    'text-translate': [0,24]
  }
};


export const unclusteredPointLayer = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'cases',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#e0e0e0',
    'circle-radius': 12,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#000'
  }
};