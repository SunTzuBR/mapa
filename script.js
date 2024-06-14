// Inicializa o mapa
var map = L.map('map').setView([-15.7801, -47.9292], 4);

// Adiciona uma camada de mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

// Função para determinar a cor com base nos atendimentos
function getColor(atendimentos) {
    return atendimentos > 1000 ? '#084594' :
           atendimentos > 500  ? '#2171b5' :
           atendimentos > 200  ? '#4292c6' :
           atendimentos > 100  ? '#6baed6' :
           atendimentos > 50   ? '#9ecae1' :
           atendimentos > 20   ? '#c6dbef' :
           atendimentos > 10   ? '#deebf7' :
                                 '#f7fbff';
}

// Função para definir o estilo das camadas
function style(feature) {
    return {
        fillColor: getColor(feature.properties.ATENDIMENTOS),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

// Função para adicionar interatividade
function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.NM_MUNICIP) {
        layer.bindPopup("<strong>Município:</strong> " + feature.properties.NM_MUNICIP + "<br>" +
                        "<strong>ID:</strong> " + feature.properties.ID + "<br>" +
                        "<strong>Atendimentos:</strong> " + feature.properties.ATENDIMENTOS);
    }
}

// Carrega o arquivo GeoJSON
fetch('AL.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o GeoJSON: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Adiciona a camada GeoJSON ao mapa
        L.geoJson(data, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);
    })
    .catch(error => console.error('Erro ao carregar o GeoJSON:', error));
