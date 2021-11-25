import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


import _ from 'lodash'
import ReactPaginate from 'react-paginate';
import '../css/pagination.css'
import TableSearch from "./TableSearch";
import {connect} from "react-redux";
import DeletePost from "./DeletePost";
import MoreIcon from '@material-ui/icons/More';
import {withRouter} from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    empty: {
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center'
    },
    hideId: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    textAlign: {
        textAlign: "right"
    },
    textAlign1: {
        textAlign: "left"
    }
}))

const Posts = (props) => {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));

    const classes = useStyles();
    const pageSize = 5

    const [sort, setSort] = useState('desc')
    const [sortField, setSortField] = useState('createdAt')
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [search, setSearch] = useState('')

    useEffect(() => {
        setData(_.orderBy(props.posts, sortField, sort))
    }, [props.posts])

    const onSort = sortField => {

        const cloneData = data.concat()
        const sortType = sort === 'asc' ? 'desc' : 'asc'

        const orderData = _.orderBy(cloneData, sortField, sortType)

        setData(orderData)
        setSort(sortType)
        setSortField(sortField)
    }

    const pageChangeHandler = ({selected}) => {
        setCurrentPage(selected)
    }

    const onSearch = search => {
        setSearch(search)
        setCurrentPage(0)
    }

    const getFilteredData = () => {
        if (!search) {
            return data
        }
        return data.filter(item => {
            return item['_id'].toLowerCase().includes(search.toLowerCase())
                || item['body'].toLowerCase().includes(search.toLowerCase())
                || item['expirationDate'].toLowerCase().includes(search.toLowerCase())

        })
    }

    const filteredData = getFilteredData()

    const displayData = _.chunk(filteredData, pageSize)[currentPage]

    const pageCount = Math.ceil(filteredData.length / pageSize)

    const handlePostClick = (postId) => {
        props.history.push(`/post/${postId}`)
    }

    function parseISOString(s) {
        let b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    }

    return (
        <div>
            {
                props.posts.length > 0 ? (
                    <>
                        <TableSearch onSearch={onSearch}/>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            className={classes.hideId}
                                            onClick={() => onSort('_id')}>
                                            ID {sortField === '_id' ?
                                            sort === 'asc' ?
                                                <ArrowUpwardIcon className={classes.arrow}/> : <ArrowDownwardIcon
                                                    className={classes.arrow}
                                                />
                                            : null}
                                        </TableCell>
                                        <TableCell
                                            onClick={() => onSort('body')} align="right">
                                            Conclusion number {sortField === 'body' ?
                                            sort === 'asc' ?
                                                <ArrowUpwardIcon className={classes.arrow}/> : <ArrowDownwardIcon
                                                    className={classes.arrow}
                                                />
                                            : null}
                                        </TableCell>
                                        <TableCell onClick={() => onSort('createdAt')} align="right">
                                            CreatedAt {sortField === 'createdAt' ?
                                            sort === 'asc' ?
                                                <ArrowUpwardIcon className={classes.arrow}/> : <ArrowDownwardIcon
                                                    className={classes.arrow}
                                                />
                                            : null}
                                        </TableCell>
                                        {/*expirationDate*/}
                                        <TableCell onClick={() => onSort('expirationDate')} align="right">
                                            Expiration Date {sortField === 'expirationDate' ?
                                            sort === 'asc' ?
                                                <ArrowUpwardIcon className={classes.arrow}/> : <ArrowDownwardIcon
                                                    className={classes.arrow}
                                                />
                                            : null}
                                        </TableCell>

                                        <TableCell align="right">
                                            Delete
                                        </TableCell>
                                        <TableCell align="right">
                                            More ...
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displayData && displayData.map((row) => (
                                        <TableRow key={row._id}>
                                            <TableCell className={classes.hideId} component="th" scope="row">
                                                {row._id}
                                            </TableCell>
                                            <TableCell
                                                className={!matches ? classes.textAlign : classes.textAlign1}
                                            >
                                                {"№ " + row.body}</TableCell>
                                            {/*<TableCell align="right">{row.createdAt}</TableCell>*/}
                                            <TableCell align="right">{(row.createdAt).split('T')[0]
                                                // + (row.createdAt).substring(11, 19)
                                            }</TableCell>
                                            {/*exprirationDate*/}
                                            <TableCell align="right">{(row.expirationDate).split('T')[0]
                                            }</TableCell>

                                            <TableCell align="right">
                                                {
                                                    props.user.authenticated && props.user._id === row.user._id ? (
                                                        <DeletePost postId={row._id}/>
                                                    ) : null
                                                }
                                            </TableCell>
                                            <TableCell align="right">
                                                {
                                                    props.user.authenticated && props.user._id === row.user._id ? (
                                                        <MoreIcon onClick={() => handlePostClick(row._id)}/>
                                                    ) : null
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {data.length > pageSize &&
                        <ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={pageChangeHandler}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                            forcePage={currentPage}
                        />
                        }
                    </>
                ) : (
                    <div className={classes.empty}>
                        Once you start making new documents, they'll appear here
                    </div>
                )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(withRouter(Posts))
