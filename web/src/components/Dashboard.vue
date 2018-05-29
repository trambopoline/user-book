<template>
	<div>
		<div class="hero is-primary">
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
						<div class="level-item">
							Showing
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
							{{ props.row.email }}
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
									<router-link :to="{name: 'Book', params: { id: book._id}}">
										More info
									</router-link>
								</li>
							</ul>
						</b-table-column>
					</template>
				</b-table>
			</div>
		</section>

		<!-- <ul v-if="users && users.length">
			<li v-for="user of users" :key="user.id">
				<h3>
					<strong>{{user.name}}</strong>
				</h3>
				<p>
					<strong>Email:</strong> {{user.email}}</p>
				<p>
					<strong>Date of birth:</strong> {{user.dateOfBirth}}</p>
				<p v-if="user.books && user.books.length">
					<strong>Books checked out:</strong>
					<ul>
						<li v-for="book of user.books" :key="book.id">
							<p>
								<strong>Title:</strong> {{book.title}}</p>
							<p>
								<strong>Author:</strong> {{book.author}}</p>
							<router-link :to="{name: 'Book', params: { id: book._id}}">
								More info
							</router-link>
						</li>
					</ul>
				</p>
				<p v-else>
					<strong class="no-books">No books checked out by this user</strong>
				</p>
			</li>
		</ul> -->
	</div>
</template>

<script>
import Vue from "vue";
import axios from "axios";

export default {
	name: "Dashboard",
	data() {
		return {
			currentPage: 1,
			perPage: 20,
			users: [],
			columns: [
				{
					field: "name",
					label: "Name",
					sortable: true
				},
				{
					field: "email",
					label: "Email",
					sortable: true
				},
				{
					field: "dateOfBirth",
					label: "Date of Birth",
					sortable: true
				},
				{
					field: "booksCheckedOut",
					label: "Books checked out"
					// sortable: true
				}
			]
		};
	},
	created() {
		// const defaultLimit = 10;
		// const defaultSort = 10;
		console.log(this.$route.params.content);
		axios
			.get(`http://localhost:3000/user?${this.$route.params.content}`)
			.then(response => {
				this.users = response.data;
				for (let user of this.users) {
					Vue.set(user, "books", []);
					if (user.booksCheckedOut === null) return;
					for (let bookId of user.booksCheckedOut) {
						axios
							.get(`http://localhost:3000/book/${bookId}`)
							.then(res => {
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
