<template>
	<div>
		<h1>Users</h1>
		<ul v-if="users && users.length">
			<li v-for="user of users" :key="user.id">
				<h3>
					<strong>{{user.name}}</strong>
					<!-- <button>Edit</button> -->
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
		</ul>
	</div>
</template>

<script>
import Vue from "vue";
import axios from "axios";

export default {
	name: "Dashboard",
	data() {
		return {
			users: []
		};
	},
	created() {
		// const defaultLimit = 10;
		// const defaultSort = 10;
		console.log(this.$route.params.content );
		axios
			.get(`http://localhost:3000/user?${this.$route.params.content}`)
			.then(response => {
				this.users = response.data;
				for (let user of this.users) {
					Vue.set(user, "books", []);
					if( user.booksCheckedOut === null ) return;
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
