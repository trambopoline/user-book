<template>
	<div>
		<div class="hero is-primary is-bold">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">
						Users
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
							users per page
						</div>
					</div>
				</div>
			</div>
			<div class="container">
				<b-table :data="users" :paginated=true :per-page="perPage" :current-page.sync="currentPage" :pagination-simple=false default-sort-direction="asc" default-sort="name">
					<template slot-scope="props">

						<b-table-column field="name" label="Name" sortable>
							{{ props.row.name }}
						</b-table-column>

						<b-table-column field="email" label="Email" sortable>
							<a :href="`mailto:${props.row.email}`">{{props.row.email}}</a>
						</b-table-column>

						<b-table-column field="dateOfBirth" label="Date of Birth" sortable centered>
							{{ new Date(props.row.dateOfBirth).toLocaleDateString() }}
						</b-table-column>

						<b-table-column label="Books Checked Out">
							<ul>
								<li v-for="book of props.row.books" :key="book.id">
									<p>
										<strong>Title:</strong> {{book.title}}</p>
									<p>
										<strong>Author:</strong> {{book.author}}</p>
									<router-link @click.native="isModalActive=true" :to="{name: 'Book', params: { id: book._id, modalHandler: () => toggleModal }}">
										More info
									</router-link>
								</li>
							</ul>
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
const userLocation = process.env.USER_URL || "http://localhost:3000/user";
const bookLocation = process.env.BOOK_URL || "http://localhost:3000/book";

export default {
	name: "Dashboard",
	data() {
		return {
			currentPage: 1,
			perPage: 20,
			users: [],
			isModalActive: false
		};
	},
	methods: {
		toggleModal() {
			console.log("TOGGLE");
		}
	},
	created() {
		console.log(this.$route.params.content);
		axios
			.get(`${userLocation}?${this.$route.params.content}`)
			.then(response => {
				this.users = response.data;
				for (let user of this.users) {
					Vue.set(user, "books", []);
					if (user.booksCheckedOut === null) return;
					for (let bookId of user.booksCheckedOut) {
						axios.get(`${bookLocation}/${bookId}`).then(res => {
							user.books.push(res.data);
						});
					}
				}
			})
			.catch(e => {
				console.error(e);
			});
	}
};
</script>

<style scoped>
</style>
