<template>
	<div>
		<div class="hero is-info is-bold">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">
						Books
					</h1>
				</div>
			</div>
		</div>
		<section class="section">
			<div class="container">
				<div class="level">
					<div class="level-right">
						<div class="level-item inline"> Showing
							<b-input type="number" v-model="perPage" size="is-small" min="1"></b-input>
							books per page
						</div>
					</div>
				</div>
			</div>
			<div class="container">
				<b-table :data="books" :paginated=true :per-page="perPage" :current-page.sync="currentPage" :pagination-simple=false default-sort-direction="asc" default-sort="title">
					<template slot-scope="props">

						<b-table-column field="title" label="Title" sortable>
							{{ props.row.title }}
						</b-table-column>

						<b-table-column field="author" label="Author" sortable>
							{{ props.row.author }}
						</b-table-column>

						<b-table-column field="published" label="Published" sortable centered>
							{{ new Date(props.row.published).toLocaleDateString() }}
						</b-table-column>

						<b-table-column field="summary" label="Summary">
							{{ props.row.summary }}
						</b-table-column>

					</template>
				</b-table>
			</div>
		</section>
		<b-modal :active.sync="isModalActive" has-modal-card>
			<router-view>
			</router-view>
		</b-modal>
	</div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
const bookLocation = process.env.BOOK_URL || "http://127.0.0.1:3000/book";

export default {
	name: "Books",
	data() {
		return {
			currentPage: 1,
			perPage: 20,
			books: [],
			isModalActive: false
		};
	},
	created() {
		console.log(this.$route.params.content);
		axios
			.get(`${bookLocation}?${this.$route.params.content}`)
			.then(response => {
				this.books = response.data;
			})
			.catch(e => {
				console.error(e);
			});
	}
};
</script>

<style scoped>
</style>
