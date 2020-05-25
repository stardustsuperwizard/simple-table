<template>
<div>
    <table>
        <thead>
            <tr>
                <th>Column1</th>
                <th>Column2</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    Value1
                </td>
                <td>
                    Value2
                </td>
            </tr>
            <tr>
                <td>
                    Value1
                </td>
                <td>
                    Value2
                </td>
            </tr>
        </tbody>
    </table>
        <ul class="pagination">
            <li class="page-item"><a href="#" class="page-link">prev</a></li>
            <li class="page-item" v-for="i in pagesArray" v-bind:key="i.name"><a href="#" class="page-link">{{ i.name }}</a></li>
            <li class="page-item"><a href="#" class="page-link">next</a></li>
        </ul>
</div>
</template>

<script>
export default {
   name: "Table",
   data: function() {
       return {
           tableData: null,
           tableMsg: null,
           url: "http://127.0.0.1:5000/api/records/nba_elo/?season=2018",
           maxVisibleButtons: 5,
           pagesCurrent: 1,
           perPage: 5,
       }
   },
   computed: {
       pagesTotal() {
           if (this.tableData != null) {
               return Math.ceil(this.tableData.length / this.perPage)
           } else {
               return 0
           }
       },
       pagesStart() {
           if (this.pagesCurrent === 1) {
               return 1
           }

           if (this.pagesCurrent === 2) {
               return this.pagesCurrent - 1
           }

           if (this.pagesCurrent === this.pagesTotal) {
               if ((this.pagesTotal - this.maxVisibleButtons + 1) <= 0) {
                   return 1
               }

               return this.pagesTotal - this.maxVisibleButtons + 2
           }

           return this.pagesCurrent - 2
       },
       pagesEnd() {
           return Math.min(this.pagesStart + this.maxVisibleButtons - 1, this.pagesTotal);
       },
       pagesArray() {
           const range = []
           for (let i = this.pagesStart; i <= this.pagesEnd; i++) {
               range.push({
                   name: i,
                   isDisabled: i === this.pagesCurrent
               })
           }
           return range
       },
   },
   mounted() {
       this.setupTable()
   },
   methods: {
       setupTable() {
           this.$http.get(this.url).then(result => {
               this.tableData = result.data
           })
           .catch(err => {
               this.tableMsg = err
           })
       }
   }
}
</script>

<style scoped>
    .pagination {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    .page-item {
        display: inline;
        padding: 5px;
    }

    .page-link {
        /* display: block; */
        /* padding: 8px; */
    }
</style>