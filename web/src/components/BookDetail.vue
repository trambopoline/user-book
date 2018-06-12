<template>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">Book Detail</p>
			<router-link @click.native="isModalActive=true" :to="{name: 'Books'}">
				See all books
			</router-link>

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
const bookLocation = process.env.BOOK_URL || "http://0.0.0.0:3000/book";

export default {
	name: "BookDetail",
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
				.put(`${bookLocation}/${this.$route.params.id}`, this.book)
				.then(response => {
					console.log(response);
					// this.book = response.data;
					// Vue.set(
					// 	this.book,
					// 	"published",
					// 	new Date(response.data.published).toLocaleDateString()
					// );
					// this.book.published = new Date(
					// 	response.data.published
					// ).toLocaleDateString();
					this.$parent.close();
				})
				.catch(e => {
					console.error(e);
				});
		},
		deleteBook() {
			axios
				.get(`${bookLocation}/${this.$route.params.id}`)
				.then(response => {
					this.danger();
				})
				.catch(e => {
					console.error(e);
				});
		},
		danger() {
			this.$snackbar.open({
				duration: 20000,
				message: `'${this.book.title}' has been deleted.`,
				type: "is-danger",
				position: "is-bottom-left"
				// actionText: 'Undo',
				// queue: false,
				// onAction: () => {
				// 	this.$toast.open({
				// 		message: `'${this.book.title}' has been restored`,
				// 		// queue: false
				// 	})
				// }
			});
		}
	},
	computed: {},
	created() {
		axios
			.get(`${bookLocation}/${this.$route.params.id}`)
			.then(response => {
				this.book = response.data;
			})
			.catch(e => {
				console.error(e);
			});
		// axios
		//   .get(`${bookLocation}/${this.$route.params.id}`)
		//   .then(response => {
		//     this.book = response.data;
		//     Vue.set(
		//       this.book,
		//       "published",
		//       new Date(response.data.published).toLocaleDateString()
		//     );

		//     // this.book.published = ;
		//   })
		//   .catch(e => {
		//     console.error(e);
		//   });
	}
};
</script>

<style>
.spaced-children {
	justify-content: space-between;
}
</style>
