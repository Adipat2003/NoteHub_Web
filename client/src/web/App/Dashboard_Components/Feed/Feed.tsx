import React, { useEffect, useState } from 'react'
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../Firebase/Firebase'
import { FeedProps } from './Feed_Interface'
import { Feed_Card } from './Feed_Card'
import { Note } from './Note'
import './feed.css'

export const Feed:React.FC = () => {

    const [filter, setFilter] = useState(0)
    const [filter2, setFilter2] = useState('Day')

    const [page, setPage] = useState(0);

    const [id, setId] = useState('')

    const [data, setData] = useState<FeedProps[]>([])
    const [filteredData, setFilteredData] = useState<FeedProps[][]>([[]])
    const [filteredData2, setFilteredData2] = useState<FeedProps[]>([])

    const [courseNumber, setCourseNumber] = useState('')
    const [university, setUniversity] = useState('')
    const [search, setSearch] = useState('')

    const notesCollectionRef = collection(db, "notes")

    useEffect(() => {

        const removeDuplicates = (arr: FeedProps[]) => {
            return arr.filter((item, index) => arr.indexOf(item) === index);
        }

        const formatter = (val: number | string) => {
            return val.toString().replace(/\s/g, '').toLowerCase()
        }

        let temp1: FeedProps[] = data
        let temp2: FeedProps[] = data
        let temp3: FeedProps[] = data
        let bit = 0

        if (university !== '') {
            temp1 = data.filter(val => formatter(val.University).includes(formatter(university)))
            bit = 1
        }
        if (courseNumber !== '') {
            temp2 = data.filter(val => formatter(val.Course).includes(formatter(courseNumber)))
            bit = 1
        }
        if (search !== '') {
            let temp_data1 = data.filter(val => formatter(val.Course).includes(formatter(search)))
            let temp_data2 = data.filter(val => formatter(val.University).includes(formatter(search)))
            let temp_data3 = data.filter(val => formatter(val.Created).includes(formatter(search)))
            let temp_data4 = data.filter(val => formatter(val.Title).includes(formatter(search)))
            temp3 = temp_data1.concat(temp_data2).concat(temp_data3).concat(temp_data4)
            temp3 = removeDuplicates(temp3)
            bit = 1
        }

        let temp_data = temp1.filter(value => temp2.includes(value));
        temp_data = temp_data.filter(value => temp3.includes(value))
        temp_data = removeDuplicates(temp_data)

        if (temp_data.length !== 0) {
            setFilteredData2(temp_data)
            setFilteredData(splitIntoEqualArrays(temp_data,6))
        } else if (bit === 1) {
            setFilteredData2([])
            setFilteredData([[]])
        } else {
            setFilteredData2(data)
            setFilteredData(splitIntoEqualArrays(data,6))
        }

    }, [courseNumber, university, search])

    useEffect(() => {
        // perform fetch request to get notes data
        const getNotes = async () => {
            const data = await getDocs(notesCollectionRef)
            const ALL_NOTES = data.docs.map((doc) => ({ ...doc.data() }))

            const feedTemp:FeedProps[] = [] 

            ALL_NOTES?.map((val) => { // <-- Added optional chaining here
                if (val?.Access === 'Public') {
                    const data = {
                        Note_ID: val?.Note_URL,
                        Profile: val?.Profile_URL,
                        Created: val?.Creator,
                        Title: val?.Title,
                        Course: val?.Course,
                        University: val?.University,
                        Views: val?.Views,
                        Likes: val?.Likes,
                        Dislikes: val?.Dislikes,
                        Date: val?.Date,
                        Comment: val?.Comments,
                        Access: val?.Access
                    }
                    feedTemp.push(data)
                }
            })

            console.log(ALL_NOTES)

            setData(feedTemp)
            setFilteredData2(feedTemp)
            setFilteredData(splitIntoEqualArrays(feedTemp, 6))

        }

        getNotes()
    }, [])

    const splitIntoEqualArrays = (arr: FeedProps[], size: number) => {
        const result = [];
        const totalSubArrays = Math.ceil(arr.length / size);
      
        for (let i = 0; i < totalSubArrays; i++) {
          result.push(arr.slice(i * size, (i + 1) * size));
        }
        return result;
    }

    const super_filter = (val: number) => {
        let temp_filtered_objects = []
        switch(val) {
            case 1:
                filter === 1 ? setFilter(0) : setFilter(1)
                temp_filtered_objects = filteredData2.sort((a, b) => b.Views - a.Views)
                setFilteredData2(temp_filtered_objects)
                setFilteredData(splitIntoEqualArrays(temp_filtered_objects,6))
                break;
            case 2:
                filter === 2 ? setFilter(0) : setFilter(2)
                temp_filtered_objects = filteredData2.sort((a, b) => (new Date(b.Date).getTime()) - (new Date(a.Date).getTime()))
                setFilteredData2(temp_filtered_objects)
                setFilteredData(splitIntoEqualArrays(temp_filtered_objects,6))
                break;
            case 3:
                filter === 3 ? setFilter(0) : setFilter(3)
                temp_filtered_objects = filteredData2.sort((a, b) => (b.Likes - b.Dislikes) - (a.Likes - a.Dislikes))
                setFilteredData2(temp_filtered_objects)
                setFilteredData(splitIntoEqualArrays(temp_filtered_objects,6))
                break;
        }
    }

    if (id !== '') {

        let note = data.find(val => val.Note_ID === id)

        if (note !== undefined && note !== null) {
            return (
                <div className='Feed_Container'>
                    <Note key={id} {...note} displayCard={(val: string) => setId(val)}/>
                </div>
            )
        } else {
            return (<></>)
        }

    } else {
        return (
            <div className='Feed_Container'>
                <div className='Feed'>
                    <div className='Feed_Filter'>
                        <button className={ filter === 1 ? 'Selected' : 'Unselected' } onClick={() => super_filter(1)}>🏹 Trending</button>
                        <button className={ filter === 2 ? 'Selected' : 'Unselected' } onClick={() => super_filter(2)}>✨ New</button>
                        <button className={ filter === 3 ? 'Selected' : 'Unselected' } onClick={() => super_filter(3)}>🔥 Hottest</button>
                        <select onChange={(e) => { setFilter2(e.target.value) }}>
                            <option>All Time</option>
                            <option>Today</option>
                            <option>Week</option>
                            <option>Month</option>
                            <option>Year</option>
                        </select>
                        <input type='text' placeholder='Course Number' onChange={(e) => { setCourseNumber(e.target.value); setPage(0); }}/>
                        <input type='text' placeholder='University' onChange={(e) => { setUniversity(e.target.value); setPage(0); }}/>
                        <input type='text' placeholder='Search' onChange={(e) => { setSearch(e.target.value); setPage(0); }}/>
                    </div>
                    <div className='Feed_Headers'>
                        <p>Profile</p>
                        <p>Created By</p>
                        <p>Title</p>
                        <p>Course Number</p>
                        <p>University</p>
                        <p>View</p>
                        <p>Likes</p>
                        <p>Dislike</p>
                        <p>Date</p>
                        <p>Save</p>
                        <p>View Notes</p>
                    </div>
                    <div className='Feed_Data'>
                        {
                            filteredData[page] !== undefined ? filteredData[page].map((val) => {
                                return (
                                    <Feed_Card key={val.Note_ID} {...val} displayCard={(val: string) => setId(val)}/>
                                )
                            }) : (<></>)                        
                        }
                    </div>
                    <div className='Feed_Footer'>
                        <p>{ page !== filteredData.length - 1 ? `${6*page + 1} - ${6*page + 6}` : `${6*page + 1} - ${filteredData2.length}`} of {filteredData2.length}</p>
                        <button onClick={() => { page !== 0 ? setPage(page - 1) : setPage(0) }}><MdArrowBackIos style={{ transform: 'translateY(1px)' }}/></button>
                        <button onClick={() => { page !== filteredData.length - 1 ? setPage(page + 1) : setPage(filteredData.length - 1) }}><MdArrowForwardIos style={{ transform: 'translateY(1px)' }}/></button>
                    </div>
                </div>
            </div>
        )
    }
}