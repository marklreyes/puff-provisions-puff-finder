# 🌱 Puff Finder

A listing app for querying cannabis seed companies, strains, brands, products, batches, retailers and studies. Built primarily with [Vue 2](https://v2.vuejs.org/) alongside [Vuidget](https://github.com/DJanoskova/Vuidget) as a way to make a Vue web app an embeddable widget in HTML. In this case, a page supported through WordPress (Eco Nature Theme). Data was sourced from [Otreeba and the Open Cannabis API](https://otreeba.com/) through [RapidAPI](https://rapidapi.com/).

## Project setup
```
nvm use v14
npm install
```

### Compiles and hot-reloads for development
```
npm run serve:dev
npm run serve:prod
```
The above command will create `http://localhost:8000/` using the following inputs:

| Directory  | SubDirectory/Asset | Developer Notes |
| ------------- |:-------------:|:-------------:|
| `/public`      |  `/wp-content`  |   All of the international flags used for data display.
| `/public`      |  index.html  |   What the web browser will be seeing while on `http://localhost:8000/`.
| `/src`      |  `/services`  |   Source your own API keys ffrom [Otreeba and the Open Cannabis API](https://otreeba.com/) through [RapidAPI](https://rapidapi.com/).
| App.vue      |    |   The root of your application defined in Vue.js Component file format.
| main.js      |    |   File that will initialize this root component into a element on your page. It is also responsible for setting up plugins and third-party components you may want to use in your app.
| env.dev      |    |   Not committed to this repo. Source your own API keys from [Otreeba and the Open Cannabis API](https://otreeba.com/) through [RapidAPI](https://rapidapi.com/).
| env.prod      |    |   Not committed to this repo. Source your own API keys from [Otreeba and the Open Cannabis API](https://otreeba.com/) through [RapidAPI](https://rapidapi.com/).


### Compiles and minifies for production
```
npm run build
```
The above command will output a `dist` directory with the following outputs:

| Directory  | SubDirectory/Asset | Developer Notes |
| ------------- |:-------------:|:-------------:|
| `/dist`      |    |
|       |  `/css`  | Take this directory in its entirety and upload it to `/wp-content/themes/yourtheme/`.  |
|       |  `/js`  | Take this directory in its entirety and upload it to `/wp-content/themes/yourtheme/`.  |
|       |  `/wp-content`  | Take the final directory `img` in its entirety and upload it to `/wp-content/themes/yourtheme/`.  |
|       |  index.html  | Copy and paste the contents of the html into your WordPress page. Don't forget to update root relative paths assigned in `href` and `src` to be 1:1 with assets uploaded to `/wp-content/themes/yourtheme/`.   |

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Demo
[Learn More](https://www.marklreyes.com/puff-finder/)

[View Puff Finder](https://www.puffprovisions.com/puff-finder/)
