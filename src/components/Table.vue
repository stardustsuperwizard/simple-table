<template>
<div>
    {{tableData}}
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