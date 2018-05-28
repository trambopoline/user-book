<template>
	<div>
		<div v-if="book">
			<h2>Book Detail</h2>
			<p>
				<strong>Title:</strong> {{book.title}}</p>
			<p>
				<strong>Author:</strong> {{book.author}}</p>
			<p>
				<strong>Summary:</strong> {{book.summary}}</p>
			<p>
				<strong>Published:</strong> {{book.published}}</p>
			<p>
				<!-- <strong>Checked out by: -->
					<!-- <ul> -->
						<!-- <li v-for="book of user.books" :key="book.id">
							<p>
								<strong>Title:</strong> {{book.title}}</p>
							<p>
								<strong>Author:</strong> {{book.author}}</p>
							<router-link :to="{name: 'Book', params: { id: book._id}}">
								More info
							</router-link>
						</li> -->
					<!-- </ul> -->
				<!-- </strong> -->
			</p>
		</div>
		<div v-else>
			Sorry, we couldn't find that book's information
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
  name: "Book",
  props: ["bookId"],
  data() {
    return {
      book: null,
      checkedOutByUsers: []
    };
  },
  created() {
    axios
      .get(`http://localhost:3000/book/${this.$route.params.id}`)
      .then(response => {
        console.log(response.data);
        this.book = response.data;
      })
      .catch(e => {
        console.error(e);
      });
    axios
      .get(`http://localhost:3000/book/${this.$route.params.id}`)
      .then(response => {
        console.log(response.data);
        this.book = response.data;
      })
      .catch(e => {
        console.error(e);
      });
  }
};
</script>

<style>
</style>
