import axios from 'axios';

const options = {
	headers: {
		"content-type":"application/octet-stream",
		"x-rapidapi-host": process.env.VUE_APP_HOST,
		"x-rapidapi-key": process.env.VUE_APP_KEY
	}
};

export default {
    // Seed Companies
    getSeedCompanies() {
        return axios.get(process.env.VUE_APP_ROOT_API + '/seed-companies', options)
        .then(response => {
            return response.data;
        });
	},

	// Strains
	getStrains() {
		return axios.get(process.env.VUE_APP_ROOT_API + '/strains', options)
        .then(response => {
            return response.data;
        });
	},

	// Brands
	getBrands() {
		return axios.get(process.env.VUE_APP_ROOT_API + '/brands', options)
        .then(response => {
            return response.data;
        });
	},

	// Pagination
	getUpdate(apiString) {
		return axios.get(apiString)
        .then(response => {
            return response.data;
        });
	}
}
