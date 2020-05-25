<template>
<div>
    <!-- {{tableData}}   -->
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
            <li class="page-item"><a href="#" class="page-link">1</a></li>
            <li class="page-item"><a href="#" class="page-link">2</a></li>
            <li class="page-item"><a href="#" class="page-link">3</a></li>
            <li class="page-item"><a href="#" class="page-link">4</a></li>
            <li class="page-item"><a href="#" class="page-link">5</a></li>
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
           url: "http://127.0.0.1:5000/api/records/nba_elo/?season=2018"
       }
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