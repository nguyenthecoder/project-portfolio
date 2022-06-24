import React, { useState } from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  Stack,
  Pagination
} from '@mui/material'
// import UtilityActionButton from '../buttons/UtilityActionButton'
// import ImportantNews from './ImportantNews'
// import { getNewsByTermAction } from '../../redux/actions/newsActions'
// import { NEWS_FETCHED, NEWS_NOT_FETCHED } from '../../redux/actions'
// import { useSelector } from 'react-redux'
import { getNewsByTerm } from '../../api/news'
import CommonNews from './CommonNews'

import PropTypes from 'prop-types'

const DetailWatchingNews = (props) => {
  const [loading, setLoading] = useState(true)
  const [news, setNews] = useState([])
  const [page, setPage] = useState(0)
  const [limit] = useState(20)
  const [total, setTotal] = useState()

  if (loading) {
    getNewsByTerm(props.term, limit, page).then(response => {
      setNews(response.data.data)
      setTotal(response.data.total)
      setLoading(false)
    })
  }

  const changePage = (page) => {
    setPage(page - 1)
    setLoading(true)
  }

  return (
    <React.Fragment>
      {
        loading && (
          <CircularProgress/>
        )
      }
      <Typography>
        Back to headlines button
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
          <Pagination
          onChange={(event, page) => changePage(page)}
          count = {Math.ceil(total / limit)}
          sx ={{ padding: 2 }}
          shape={'rounded'}/>
        <Stack spacing={3}>
          <Typography
          sx={{
            fontSize: 18,
            fontWeight: 'bold'
          }}
          >Showing {page * limit} - {(page * limit + limit) < total ? (page * limit + limit) : total} of all {total} news about {props.term} </Typography>
          {
            !loading && news.slice(0, 10).map((item, index) => {
              const dateObj = new Date(Date.parse(item.date))
              const dateStr = dateObj.toDateString()

              return (
              <CommonNews
                key = {index}
                title = {item.title}
                image_url = {item.image_url}
                source = {item.source}
                time = {dateStr}
                url = {item.url}
              />
              )
            })
          }
        </Stack>
        <Pagination
        onChange={(event, page) => changePage(page)}
        count = {Math.floor(total / limit)}
        sx ={{ padding: 5 }}
        shape={'rounded'}/>
      </Box>

    </React.Fragment>
  )
}

DetailWatchingNews.propTypes = {
  term: PropTypes.string.isRequired
}

export default React.memo(DetailWatchingNews)
