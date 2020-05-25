<template>
<div>
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Season</th>
                <th>Team 1</th>
                <th>Score 1</th>
                <th>Team 2</th>
                <th>Score 2</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="object in tableRows" v-bind:key="object.id">
                <td>{{object.date}}</td>
                <td>{{object.season}}</td>
                <td>{{object.team1}}</td>
                <td>{{object.score1}}</td>
                <td>{{object.team2}}</td>
                <td>{{object.score2}}</td>
                <!-- <td v-for="value in object" v-bind:key="value.date">{{value}}</td> -->
            </tr>
        </tbody>
    </table>
        <ul class="pagination">
            <li class="page-item" v-on:click="changePageFirst()"><a href="#" class="page-link">first (1)    </a></li>
            <li class="page-item" v-on:click="prevPage()"><a href="#" class="page-link">prev</a></li>
            <li class="page-item" v-for="i in pagesArray" v-bind:key="i.name" v-on:click="changePage(i.name)"><a href="#" class="page-link">{{ i.name }}</a></li>
            <li class="page-item" v-on:click="nextPage()"><a href="#" class="page-link">next</a></li>
            <li class="page-item" v-on:click="changePageLast()"><a href="#" class="page-link">last ({{pagesTotal}})</a></li>
        </ul>
</div>
</template>

<script>
export default {
    name: "Table",
    data: function() {
        return {
            tableData: [],
            tableMsg: null,
            url: "http://127.0.0.1:5000/api/records/nba_elo/?season=2018",
            maxVisibleButtons: 5,
            pagesCurrent: 1,
            perPage: 10,
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
        tableRows() {
            let start = (this.pagesCurrent - 1) * parseInt(this.perPage)
            let end = start + parseInt(this.perPage)
            return this.tableData.slice(start, end)
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
        },
        changePage(page) {
            this.pagesCurrent = page
        },
        nextPage() {
            if (this.pagesCurrent < this.pagesTotal) { this.pagesCurrent++ }
        },
        prevPage() {
            if (this.pagesCurrent > 1) { this.pagesCurrent-- }
        },
        changePageFirst() {
            this.pagesCurrent = 1
        },
        changePageLast() {
            this.pagesCurrent = this.pagesTotal
        }
   },
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

    table {
        border-collapse: collapse;
        width: 100%;
    }

    td, th {
        padding: 5px;
        border-bottom: 1px solid #ddd;
    }
</style>