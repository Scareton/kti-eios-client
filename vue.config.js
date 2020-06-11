module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  "devServer": {
    "public": "sundear.ru",
    // "port": 80
  },
  "pwa": {
    "name": "ЭИОС КТИ (Филиал ВолгГТУ)",
    "themeColor": "#1976d2",
    "manifestOptions": {
      "short_name": "ЭИОС",
      "icons": [
        {
          'src': './img/icons/logo.png',
          'sizes': '192x192',
          'type': 'image/png'
        },
        {
          'src': './img/icons/logo.png',
          'sizes': '512x512',
          'type': 'image/png'
        },
        {
          'src': './img/icons/logo.png',
          'sizes': '192x192',
          'type': 'image/png',
          'purpose': 'maskable'
        },
        {
          'src': './img/icons/logo.png',
          'sizes': '512x512',
          'type': 'image/png',
          'purpose': 'maskable'
        }
      ]
    }
  }
}