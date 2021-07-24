const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/voyager/style.json?key=FUWC63pC4JOppUGhyT5X',
    center: [7, 20], 
    zoom: 1.8,
});

map.on('load', () => {
    map.addSource('states', {
        'type': 'geojson',
        'data': 'countries.geojson'
    })
    map.addLayer({
        'id': 'countries-layer',
        'type': 'fill',
        'source': 'states',
        'paint': {
            'fill-color': 'rgba(0, 0, 0, 0)',
            'fill-outline-color': 'rgba(0, 0, 0, .3)'
        }
    })
})

const c = new MapboxChoropleth({
    tableUrl: 'countries.csv',
    tableNumericField: 'GDP_per_capita',
    tableIdField: 'fid',
    geometryUrl: 'countries.geojson',
    geometryIdField: 'fid',
    binCount: 7,
    colorScheme: 'RdPu',
    legendElement: '#legend',
    numberFormatFunc: x => x.toFixed(0),
})

c.addTo(map)