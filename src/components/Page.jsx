import Pagination from 'react-bootstrap/Pagination';
import React, { useState, useEffect } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { updatePage } from "../slice/pageSlice";
import { useDispatch, useSelector } from "react-redux";

export const Page = (props) => {
	const [lists, setLists] = useState();
	const [active, setActive] = useState(1);
	const [flag, setFlag] = React.useState();
	const page = useSelector((state) => state.page.isPage);
  const offset = useSelector((state) => state.page.isOffset);
  const dispatch = useDispatch();
	const max = 10;
	const items = [];

	useEffect(() => {
		for (let number = 1; number <= props.maxPage; number++) {
			items.push(number);
		}
		setLists(items);
		setFlag('success');
	}, [flag])

	const changePage = (number) => {
		setActive(number);
		props.setChangePage(number);
		dispatch(updatePage(number));
	}

	return (
    <div className='container p-2'>  
	 		{lists && <Pagination>{ lists.map((el, i) => <Pagination.Item key={i} active={el === active} onClick={ () => changePage(el) }>{el}</Pagination.Item>)}</Pagination>}
    </div>  
  );  
}
