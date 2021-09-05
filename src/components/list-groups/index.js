import React from 'react';
import { Badge, ListGroup, ListGroupItem } from 'reactstrap';

const ListGroupsComponent = ({ title, data, displayBadge = true, handleClick = null }) => {
	return (
		<React.Fragment>
			<h2>{title}</h2>
		
			<ListGroup>
				{data.map(({ name, playcount }) => (
					<ListGroupItem
						key={name}
						className="justify-content-between"
						tag="a"
						onClick={() => handleClick(name)}
					>
						{name}
						{" "}
						{displayBadge && <Badge pill title="Playcounts">{playcount}</Badge>}
					</ListGroupItem>
				))}
			</ListGroup>

			<br />
			<br />
		</React.Fragment>
	)
};

const ListGroupsComponentTopTracks = ({ title, data, displayBadge = true }) => {
	return (
		<React.Fragment>
			<h2>{title}</h2>
		
			<ListGroup>
				{data.map(({ name, url, playcount }) => (
					<ListGroupItem
						key={name}
						className="justify-content-between"
						tag="a"
						target="_blank"
						rel="noopener noreferrer"
						href={url}
					>
						{name}
						{" "}
						{displayBadge && <Badge pill title="Playcounts">{playcount}</Badge>}
					</ListGroupItem>
				))}
			</ListGroup>

			<br />
			<br />
		</React.Fragment>
	)
};

export { ListGroupsComponent, ListGroupsComponentTopTracks };