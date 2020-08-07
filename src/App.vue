<template>
  <HelloWorld msg="Hello Vue 3.0 + Vite" />

  <form @submit.prevent="fetchRssFeed">
    <input v-model="providedURL" type="text" placeholder="Type your URL here" required />
    <input type="submit" value="Fetch RSS" />
  </form>

  <div v-if="fetchedFeeds.length>0">
    <div class="card" v-for="node in filteredFeed">
      <h3>{{getTitle(node)}}</h3>
      <div v-html="node.innerHTML"></div>
    </div>

    <div>
      <div class="pagination">
        <ul v-for="(page, index) in paginationPages">
          <button :class="{active:currentPage==page}" @click="currentPage=page">{{page}}</button>
        </ul>
      </div>
    </div>
  </div>

  <div v-else>{{fetchingState}}</div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  setup() {},

  name: "MyLivn",
  components: {
    HelloWorld
  },

  data() {
    return {
      providedURL: "https://hnrss.org/newest",
      CorsProxy: "https://cors-anywhere.herokuapp.com/",
      fetchedFeeds: [],
      feedInformation: "",
      fetchingState: "",
      maxElementsPerPage: 3,
      currentPage: 1
    };
  },

  computed: {
    filteredFeed() {
      return this.paginate(
        [...this.fetchedFeeds],
        this.maxElementsPerPage,
        this.currentPage
      );
    },

    paginationPages() {
      if (this.fetchedFeeds.length == 0) {
        return 0;
      }
      return Math.ceil(this.fetchedFeeds.length / this.maxElementsPerPage);
    }
  },
  methods: {
    paginate(array, page_size, page_number) {
      // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    },
    // parse the title from Node
    getTitle(node) {
      return node.querySelector("title").innerHTML;
    },

    fetchRssFeed() {
      // check if URL is provided by user
      // future work: check if string is url with regex
      if (this.providedURL == "") {
        return;
      }

      this.resetRSSList();
      this.fetchingState = "fetching ..";

      let self = this;
      fetch(this.CorsProxy + this.providedURL)
        .then(response => {
          // check if request secced
          if (response.ok) {
            return response.text();
          } else {
            return Promise.reject(response.statusText);
          }
        })
        .then(xmlTxt => {
          this.fetchingState = "";
          self.fetchedFeeds = self.parseItemsFromXML(xmlTxt);
        })
        .catch(function(error) {
          self.fetchingState = error;
        });
    },

    parseItemsFromXML(xmlTxt) {
      var domParser = new DOMParser();
      let doc = domParser.parseFromString(xmlTxt, "text/xml");
      let items = doc.querySelectorAll("item");
      return items;
    },
    resetRSSList() {
      this.fetchedFeeds = [];
      this.feedInformation = "";
      this.fetchingState = "";
    }
  }
};
</script>

<style >
.card {
  border-radius: 25px;
  max-width: 50rem;
  margin-right: auto;
  margin-left: auto;
  border: solid 1px;
  padding: 2rem;
  margin-bottom: 10px;
  margin-top: 10px;
  overflow: hidden;
}

.pagination {
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  justify-content: center;
}

.active {
  background: blue;
  color: white;
}
</style>
