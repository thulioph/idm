import React from 'react';
import { Table } from 'reactstrap';

const TableComponent = (props) => {
	const { metaData, dest, source } = props

	return (
		<React.Fragment>
			<h3>{metaData.kind}</h3>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>cover</th>
						<th>sound</th>
						<th>label</th>
						<th>year</th>
						<th>video</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<th scope="row">source</th>
						<td>
							<img src={source.image} />
						</td>
						<td>{source.artist} - {source.name}</td>
						<td>{source.label}</td>
						<td>{source.year}</td>
						<td>
							<a target="_blank" rel="noopener noreferrer" href={`https://www.youtube.com/watch?v=${source.youtubeId}?t=${source.appearsAt}`}>link</a>
						</td>
					</tr>

					<tr>
						<th scope="row">dest</th>
						<td>
							<img src={dest.image} />
						</td>
						<td>{dest.artist} - {dest.name}</td>
						<td>{dest.label}</td>
						<td>{dest.year}</td>
						<td>
							<a rel="noopener noreferrer" href={`https://www.youtube.com/watch?v=${dest.youtubeId}?t=${dest.appearsAt}`}>link</a>
						</td>
					</tr>
				</tbody>
			</Table>

			<br />
		</React.Fragment>
	)
}

export default TableComponent