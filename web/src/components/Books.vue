<template>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">Book Detail</p>
			<a>See all books</a>
		</header>
		<section class="modal-card-body">
			<b-field label="Title">
				<b-input type="text" v-model="book.title">
				</b-input>
			</b-field>
			<b-field label="Author">
				<b-input type="text" v-model="book.author">
				</b-input>
			</b-field>
			<b-field label="Summary">
				<b-input type="textarea" v-model="book.summary">
				</b-input>
			</b-field>
			<b-field label="Published">
				<b-input type="text" v-model="book.published">
				</b-input>
			</b-field>
		</section>
		<footer class="modal-card-foot spaced-children">
			<button class="button is-success" @click="saveChanges">Save Changes</button>
			<button class="button is-danger" @click="deleteBook">Delete</button>
		</footer>
	</div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
export default {
	name: "Book",
	data() {
		return {
			book: null,
			checkedOutByUsers: []
			// readablePublishedDate: ""
		};
	},
	methods: {
		saveChanges() {
			// console.log(this.book);
			axios
				.put(
					`http://localhost:3000/book/${this.$route.params.id}`,
					this.book
				)
				.then(response => {
					console.log(response);
					this.book = response.data;
					Vue.set(
						this.book,
						"published",
						new Date(response.data.published).toLocaleDateString()
					);
					this.book.published = new Date(
						response.data.published
					).toLocaleDateString();
				})
				.catch(e => {
					console.error(e);
				});
		},
		deleteBook() {}
	},
	computed: {},
	created() {
		axios
			.get(`http://localhost:3000/book/${this.$route.params.id}`)
			.then(response => {
				this.book = response.data;
			})
			.catch(e => {
				console.error(e);
			});
		axios
			.get(`http://localhost:3000/book/${this.$route.params.id}`)
			.then(response => {
				this.book = response.data;
				Vue.set(
					this.book,
					"published",
					new Date(response.data.published).toLocaleDateString()
				);

				// this.book.published = ;
			})
			.catch(e => {
				console.error(e);
			});
	}
};
</script>

<style>
.spaced-children {
	justify-content: space-between;
}
</style>
