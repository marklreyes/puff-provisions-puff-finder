<template>
  <div id="app">
		<div id="puff-finder-app">
			<div class="container">
				<div class="row">
					<div class="offset-md-1 col-md-10 col-sm-12">
						<h2 class="text-center">🌱 Puff Finder</h2>
						<p class="text-center">Standardized data and normalization for cannabis seed companies, strains, brands, products, batches, retailers, and studies.</p>
						<div class="row">
							<div class="offset-lg-3 col-lg-6 offset-sm-1 col-sm-10">
								<b-form-select class="text-center" v-model="selected" :options="options" @change="sortBy"></b-form-select>
							</div>
						</div>
					</div>
				</div>
				<hr>
				<div class="row">
					<div class="col-12">
						<div v-if="displayErrorView">
							<b-alert show variant="danger">{{errorMessage}}</b-alert>
						</div>
						<div v-if="!displayLoading">
							<div v-if="results && results.data">
								<div v-if="displaySeedCompanyView">
									<div class="row">
										<div class="col-md-6 col-sm-12 text-left pagination-puff-finder">
											<p class="mt-3">Page: {{ meta.pagination.current_page }} of {{ meta.pagination.total_pages }}</p>
										</div>
										<div class="col-md-6 col-sm-12 text-right pagination-puff-finder">
											<b-button-group>
												<b-button-group class="mx-1" left>
													<b-button @click="prev(links.previous);" :disabled="isPreviousDisabled" variant="outline-primary">&lsaquo; PREVIOUS</b-button>
												</b-button-group>
												<b-button-group class="mx-1" right>
													<b-button @click="next(links.next);" :disabled="isNextDisabled" variant="outline-primary">NEXT &rsaquo;</b-button>
												</b-button-group>
											</b-button-group>
										</div>
									</div>
									<table class="table table-striped table-responsive table-mobile-collapse text-left">
										<thead class="thead-light">
											<tr>
												<th>Seed Company</th>
												<th>Image</th>
												<th>Description</th>
												<th>Strain Report</th>
												<th>Lineage</th>
												<th>Strains</th>
											</tr>
										</thead>
										<tbody>
											<tr v-bind:key="index" v-for="(seedCompanies, index) in results.data">
												<td data-title="Seed Company">
													<div>
														{{seedCompanies.name}}
													</div>
												</td>
												<td data-title="Image">
													<div>
														<b-link :href="seedCompanies.url" target="_blank" rel="nofollow">
															<b-img :src="seedCompanies.image" v-bind="mainProps" thumbnail fluid center :alt="seedCompanies.name" @error="imageUrlAlt"></b-img>
														</b-link>
													</div>
												</td>
												<td data-title="Description">
													<div v-if="seedCompanies.description && seedCompanies.description.length > 0">
														<div>{{seedCompanies.description}}</div>
													</div>
													<div v-if="!seedCompanies.description || !seedCompanies.description.length > 0">
														<div>Description not available.</div>
													</div>
												</td>
												<td data-title="Strain Report">
													<div>
														<b-link :href="seedCompanies.url" target="_blank" rel="nofollow">View Cannabis Report</b-link>
													</div>
												</td>
												<td data-title="Lineage">
													<div v-bind:key="index" v-for="(lineage, index) in seedCompanies.lineage">
														<!-- <flag :iso="lineage | lowercase" /> -->
														<gb-flag :code="lineage | lowercase" size="small" />
													</div>
												</td>
												<td data-title="Strains">
													<div v-bind:key="index" v-for="(strains, index) in seedCompanies.strains">
														{{strains}}
													</div>
												</td>
											</tr>
										</tbody>
									</table>
									<div class="row">
										<div class="col-md-6 col-sm-12 text-left pagination-puff-finder">
											<p class="mt-3">Page: {{ meta.pagination.current_page }} of {{ meta.pagination.total_pages }}</p>
										</div>
										<div class="col-md-6 col-sm-12 text-right pagination-puff-finder">
											<b-button-group>
												<b-button-group class="mx-1" left>
													<b-button @click="prev(links.previous);" :disabled="isPreviousDisabled" variant="outline-primary">&lsaquo; PREVIOUS</b-button>
												</b-button-group>
												<b-button-group class="mx-1" right>
													<b-button @click="next(links.next);" :disabled="isNextDisabled" variant="outline-primary">NEXT &rsaquo;</b-button>
												</b-button-group>
											</b-button-group>
										</div>
									</div>
								</div>
								<div v-if="displayStrainsView">
									<div class="row">
										<div class="col-md-6 col-sm-12 text-left pagination-puff-finder">
											<p class="mt-3">Page: {{ meta.pagination.current_page }} of {{ meta.pagination.total_pages }}</p>
										</div>
										<div class="col-md-6 col-sm-12 text-right pagination-puff-finder">
											<b-button-group>
												<b-button-group class="mx-1" left>
													<b-button @click="prev(links.previous);" :disabled="isPreviousDisabled" variant="outline-primary">&lsaquo; PREVIOUS</b-button>
												</b-button-group>
												<b-button-group class="mx-1" right>
													<b-button @click="next(links.next);" :disabled="isNextDisabled" variant="outline-primary">NEXT &rsaquo;</b-button>
												</b-button-group>
											</b-button-group>
										</div>
									</div>
									<table class="table table-striped table-responsive table-mobile-collapse text-left">
										<thead class="thead-light">
											<tr>
												<th>Strain</th>
												<th>Image</th>
												<th>Strain Report</th>
												<th>Lineage</th>
												<th>Genetics</th>
												<th>Seed Company</th>
											</tr>
										</thead>
										<tbody>
											<tr v-bind:key="index" v-for="(seedCompanies, index) in results.data">
												<td data-title="Strain">
													<div>
														{{seedCompanies.name}}
													</div>
												</td>
												<td data-title="Image">
													<div>
														<b-link :href="seedCompanies.url" target="_blank" rel="nofollow">
															<b-img :src="seedCompanies.image" v-bind="mainProps" thumbnail fluid center :alt="seedCompanies.name" @error="imageUrlAlt"></b-img>
														</b-link>
													</div>
												</td>
												<td data-title="Strain Report">
													<div>
														<b-link :href="seedCompanies.url" target="_blank" rel="nofollow">View Cannabis Report</b-link>
													</div>
												</td>
												<td data-title="Lineage">
													<div v-bind:key="index" v-for="(lineage, index) in seedCompanies.lineage">
														<!-- <flag :iso="lineage | lowercase" /> -->
														<gb-flag :code="lineage | lowercase" size="small" />
													</div>
												</td>
												<td data-title="Genetics">
													<div v-if="seedCompanies.genetics.names && seedCompanies.genetics.names.length > 0">
														{{seedCompanies.genetics.names}}
													</div>
													<div v-if="!seedCompanies.genetics.names || !seedCompanies.genetics.names.length > 0">
														Genetics name not available.
													</div>
												</td>
												<td data-title="Seed Company">
													<div>
														{{seedCompanies.seedCompany.name}}
													</div>
												</td>
											</tr>
										</tbody>
									</table>
									<div class="row">
										<div class="col-md-6 col-sm-12 text-left pagination-puff-finder">
											<p class="mt-3">Page: {{ meta.pagination.current_page }} of {{ meta.pagination.total_pages }}</p>
										</div>
										<div class="col-md-6 col-sm-12 text-right pagination-puff-finder">
											<b-button-group>
												<b-button-group class="mx-1" left>
													<b-button @click="prev(links.previous);" :disabled="isPreviousDisabled" variant="outline-primary">&lsaquo; PREVIOUS</b-button>
												</b-button-group>
												<b-button-group class="mx-1" right>
													<b-button @click="next(links.next);" :disabled="isNextDisabled" variant="outline-primary">NEXT &rsaquo;</b-button>
												</b-button-group>
											</b-button-group>
										</div>
									</div>
								</div>
								<div v-if="displayBrandsView">
									<div class="row">
										<div class="col-md-6 col-sm-12 text-left pagination-puff-finder">
											<p class="mt-3">Page: {{ meta.pagination.current_page }} of {{ meta.pagination.total_pages }}</p>
										</div>
										<div class="col-md-6 col-sm-12 text-right pagination-puff-finder">
											<b-button-group>
												<b-button-group class="mx-1" left>
													<b-button @click="prev(links.previous);" :disabled="isPreviousDisabled" variant="outline-primary">&lsaquo; PREVIOUS</b-button>
												</b-button-group>
												<b-button-group class="mx-1" right>
													<b-button @click="next(links.next);" :disabled="isNextDisabled" variant="outline-primary">NEXT &rsaquo;</b-button>
												</b-button-group>
											</b-button-group>
										</div>
									</div>
									<table class="table table-striped table-responsive table-mobile-collapse text-left">
										<thead class="thead-light">
											<tr>
												<th>Brand</th>
												<th>Image</th>
												<th>Strain Report</th>
												<th>Flowers</th>
												<th>Extracts</th>
												<th>Edibles</th>
												<th>Products</th>
											</tr>
										</thead>
										<tbody>
											<tr v-bind:key="index" v-for="(seedCompanies, index) in results.data">
												<td data-title="Brand">
													<div>
														{{seedCompanies.name}}
													</div>
												</td>
												<td data-title="Image">
													<div>
														<b-link :href="seedCompanies.url" target="_blank" rel="nofollow">
															<b-img :src="seedCompanies.image" v-bind="mainProps" thumbnail fluid center :alt="seedCompanies.name" @error="imageUrlAlt"></b-img>
														</b-link>
													</div>
												</td>
												<td data-title="Strain Report">
													<div>
														<b-link :href="seedCompanies.url" target="_blank" rel="nofollow">View Cannabis Report</b-link>
													</div>
												</td>
												<td data-title="Flowers">
													<div v-if="seedCompanies.flowers && seedCompanies.flowers.length > 0">
														<div v-bind:key="index" v-for="(flowers, index) in seedCompanies.flowers">
															{{flowers}}
														</div>
													</div>
													<div v-if="!seedCompanies.flowers || !seedCompanies.flowers.length > 0">
														Flowers list not available.
													</div>
												</td>
												<td data-title="Extracts">
													<div v-if="seedCompanies.extracts && seedCompanies.extracts.length > 0">
														<div v-bind:key="index" v-for="(extracts, index) in seedCompanies.extracts">
															{{extracts}}
														</div>
													</div>
													<div v-if="!seedCompanies.extracts || !seedCompanies.extracts.length > 0">
														Extracts list not available.
													</div>
												</td>
												<td data-title="Edibles">
													<div v-if="seedCompanies.edibles && seedCompanies.edibles.length > 0">
														<div v-bind:key="index" v-for="(edibles, index) in seedCompanies.edibles">
															{{edibles}}
														</div>
													</div>
													<div v-if="!seedCompanies.edibles || !seedCompanies.edibles.length > 0">
														Edibles list not available.
													</div>
												</td>
												<td data-title="Products">
													<div v-if="seedCompanies.products && seedCompanies.products.length > 0">
														<div v-bind:key="index" v-for="(products, index) in seedCompanies.products">
															{{products}}
														</div>
													</div>
													<div v-if="!seedCompanies.products || !seedCompanies.products.length > 0">
														Products list not available.
													</div>
												</td>
											</tr>
										</tbody>
									</table>
									<div class="row">
										<div class="col-md-6 col-sm-12 text-left pagination-puff-finder">
											<p class="mt-3">Page: {{ meta.pagination.current_page }} of {{ meta.pagination.total_pages }}</p>
										</div>
										<div class="col-md-6 col-sm-12 text-right pagination-puff-finder">
											<b-button-group>
												<b-button-group class="mx-1" left>
													<b-button @click="prev(links.previous);" :disabled="isPreviousDisabled" variant="outline-primary">&lsaquo; PREVIOUS</b-button>
												</b-button-group>
												<b-button-group class="mx-1" right>
													<b-button @click="next(links.next);" :disabled="isNextDisabled" variant="outline-primary">NEXT &rsaquo;</b-button>
												</b-button-group>
											</b-button-group>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div v-if="displayLoading">
							<div class="text-center">
								<b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
							</div>
						</div>
						<div v-if="displayDefaultView">
							<div class="row">
								<div class="col-12 text-center">
									<span>Choose a filter from above to see the results.</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr>
				<div class="row">
					<div class="col-12 text-center">
						<p><small>Puff Finder is a free open source cannabis resource provided to you by Puff Provisions LLC.<br>For more information please email: <a href="mailto:info@puffprovisions.com?subject=Mail from Puff Finder">info@puffprovisions.com</a></small></p>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import OtreebaAPI from '@/services/OtreebaAPI';

export default {
  name: 'puff-finder-app',
	data() {
		return {
			mainProps: {
				width: 100,
				class: 'm1'
			},
			displaySeedCompanyView: false,
			displayStrainsView: false,
			displayBrandsView: false,
			displayLoading: false,
			displayErrorView: false,
			displayDefaultView: true,
			errorMessage: null,
			selected: null,
			statusCode: null,
			options: [
				{ value: null, text: 'Please select an option' },
				{ value: 'companies', text: 'Seed Companies' },
				{ value: 'strains', text: 'Strains' },
				{ value: 'brands', text: 'Brands' }
			],
			isPreviousDisabled: true,
			isNextDisabled: true,
			links: {
				previous: null,
				next: null,
				length: null
			},
			results: null,
			meta: null
		}
	},
	filters: {
		lowercase: function (value) {
			if (!value) return '';
			value = value.toString();
			return value.charAt(0).toLowerCase() + value.slice(1);
		}
	},
	methods: {
		sortBy(e) {
			let selection = e;
			switch(selection) {
				case 'companies':
					this.getSeedCompanies();
					this.displaySeedCompanyView = true;
					this.displayStrainsView = false;
					this.displayBrandsView = false;
					this.displayDefaultView = false;
					break;
				case 'strains':
					this.getStrains();
					this.displaySeedCompanyView = false;
					this.displayStrainsView = true;
					this.displayBrandsView = false;
					this.displayDefaultView = false;
					break;
				case 'brands':
					this.getBrands();
					this.displaySeedCompanyView = false;
					this.displayStrainsView = false;
					this.displayBrandsView = true;
					this.displayDefaultView = false;
					break;
				default:
					this.displayLoading = false;
					this.displayErrorView = false;
					this.displaySeedCompanyView = false;
					this.displayStrainsView = false;
					this.displayBrandsView = false;
					this.displayDefaultView = true;
					break;
			}
		},
		getSeedCompanies() {
			this.displayLoading = true;
			this.displayErrorView = false;
			this.displayRedAlert = false;
			OtreebaAPI.getSeedCompanies()
			.then(posts => {
					// Table Results
					this.results = posts;

					// Pagination Elements
					this.meta = posts.meta;
					this.links.previous = posts.meta.pagination.links.previous;
					this.links.next = posts.meta.pagination.links.next;
					this.links.length = posts.meta.pagination.total_pages;

					// Toggle Disabled on Buttons
					if (this.links.previous && this.links.previous.length > 0) {
						this.isPreviousDisabled = false;
					} else {
						this.isPreviousDisabled = true;
					}

					if (this.links.next && this.links.next.length > 0) {
						this.isNextDisabled = false;

					} else {
						this.isNextDisabled = true;
					}

					// Display Elements
					this.displayErrorView = false;
					this.displayLoading = false;
			})
			.catch(error => {
					this.errorMessage = error.message;
					this.displayErrorView = true;
					this.displayLoading = false;
					this.displaySeedCompanyView = false;
					this.displayStrainsView = false;
					this.displayBrandsView = false;
					this.displayDefaultView = false;
					return error;
			});
		},
		getStrains() {
			this.displayLoading = true;
			this.displayErrorView = false;
			this.displayRedAlert = false;
			OtreebaAPI.getStrains()
			.then(posts => {
					// Table Results
					this.results = posts;

					// Pagination Elements
					this.meta = posts.meta;
					this.links.previous = posts.meta.pagination.links.previous;
					this.links.next = posts.meta.pagination.links.next;
					this.links.length = posts.meta.pagination.total_pages;

					// Toggle Disabled on Buttons
					if (this.links.previous && this.links.previous.length > 0) {
						this.isPreviousDisabled = false;
					} else {
						this.isPreviousDisabled = true;
					}

					if (this.links.next && this.links.next.length > 0) {
						this.isNextDisabled = false;

					} else {
						this.isNextDisabled = true;
					}

					// Display Elements
					this.displayErrorView = false;
					this.displayLoading = false;
			})
			.catch(error => {
					this.errorMessage = error.message;
					this.displayErrorView = true;
					this.displayLoading = false;
					this.displaySeedCompanyView = false;
					this.displayStrainsView = false;
					this.displayBrandsView = false;
					this.displayDefaultView = false;
					return error;
			});
		},
		getBrands() {
			this.displayLoading = true;
			this.displayErrorView = false;
			this.displayRedAlert = false;
			OtreebaAPI.getBrands()
			.then(posts => {
					// Table Results
					this.results = posts;

					// Pagination Elements
					this.meta = posts.meta;
					this.links.previous = posts.meta.pagination.links.previous;
					this.links.next = posts.meta.pagination.links.next;
					this.links.length = posts.meta.pagination.total_pages;

					// Toggle Disabled on Buttons
					if (this.links.previous && this.links.previous.length > 0) {
						this.isPreviousDisabled = false;
					} else {
						this.isPreviousDisabled = true;
					}

					if (this.links.next && this.links.next.length > 0) {
						this.isNextDisabled = false;

					} else {
						this.isNextDisabled = true;
					}

					// Display Elements
					this.displayErrorView = false;
					this.displayLoading = false;
			})
			.catch(error => {
					this.errorMessage = error.message;
					this.displayErrorView = true;
					this.displayLoading = false;
					this.displaySeedCompanyView = false;
					this.displayStrainsView = false;
					this.displayBrandsView = false;
					this.displayDefaultView = false;
					return error;
			});
		},
		updateResults(api) {
			this.displayLoading = true;
			this.displayErrorView = false;
			this.displayRedAlert = false;
			OtreebaAPI.getUpdate(api)
			.then(posts => {
					// Table Results
					this.results = posts;

					// Pagination Elements
					this.meta = posts.meta;
					this.links.previous = posts.meta.pagination.links.previous;
					this.links.next = posts.meta.pagination.links.next;
					this.links.length = posts.meta.pagination.total_pages;

					// Toggle Disabled on Buttons
					if (this.links.previous && this.links.previous.length > 0) {
						this.isPreviousDisabled = false;
					} else {
						this.isPreviousDisabled = true;
					}

					if (this.links.next && this.links.next.length > 0) {
						this.isNextDisabled = false;

					} else {
						this.isNextDisabled = true;
					}

					// Display Elements
					this.displayErrorView = false;
					this.displayLoading = false;
			})
			.catch(error => {
					this.errorMessage = error.message;
					this.displayErrorView = true;
					this.displayLoading = false;
					this.displaySeedCompanyView = false;
					this.displayStrainsView = false;
					this.displayBrandsView = false;
					this.displayDefaultView = false;
					return error;
			});
		},
		imageUrlAlt(event) {
			// event.target.src = 'https://www.cannabisreports.com/images/strains/no_image.png';
			event.target.src = 'https://www.puffprovisions.com/wp-content/uploads/2019/07/puffprovisions_sitelogo_alternate.png';
		},
		prev(link) {
			this.updateResults(link);
		},
		next(link) {
			this.updateResults(link);
		}
	}
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.listing-cannabis {
	list-style-type: none;
	margin: auto;
	padding: 0;
}
@media (max-width: 992px) {
	.table-mobile-collapse {
		display: block;
		border-left: none;
		border-right: 0;
	}
	.table-mobile-collapse thead {
		display: none;
		border: 0;
	}
	.table-mobile-collapse tfoot {
		display: none;
		border: 0;
	}
	.table-mobile-collapse tbody {
		display: block;
		width: auto;
		padding: 0;
		border: 0 !important;
		padding: 5px 0;
	}
	.table-mobile-collapse tr {
		display: block;
		width: auto;
		padding: 0;
		border: 0;
		padding: 5px 0;
	}
	.table-mobile-collapse td {
		display: block;
		width: auto;
		padding: 0;
		border: 0;
		padding: 5px 10px;
	}
	.table-mobile-collapse td[title]:before {
		content: attr(title);
		float: left;
		font-weight: bold;
		width: 100%;
		clear: left;
	}
	.table-mobile-collapse td[title]:after {
		clear: left;
	}
	.table-mobile-collapse td[data-title]:before {
		content: attr(data-title);
		float: left;
		font-weight: bold;
		width: 100%;
		clear: left;
	}
	.table-mobile-collapse td[data-title]:after {
		clear: left;
	}
}
@media (max-width: 768px) {
	.pagination-puff-finder {
		text-align: center !important;
		margin: 0 auto 10px;
	}
}
</style>
