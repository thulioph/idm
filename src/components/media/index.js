import React from 'react';
import { Media, Badge, Alert } from 'reactstrap';

const getCardImage = (imgArr) => {
	const image = imgArr.find(({ size }) => size === 'mega')

	if (!image) return ''

	return image['#text']
}

const defaultObj = {
	aliases: [],
	name: '',
	'life-span': { begin: '', end: '', ended: false }
}

const MediaComponent = ({ lastfm, musicbrainz = defaultObj }) => {
	const {
		bio,
		images = [],
		tags = [],
	} = lastfm

	const { aliases, name } = musicbrainz
	const { begin, end, ended } = musicbrainz["life-span"]

  return (
		<React.Fragment>
			<Media left middle>
				<Media left>
					<figure>
						<img src={getCardImage(images)} />
					</figure>
				</Media>

				<Media heading>{name}</Media>

				<Media body>
					<small className="text-muted">
						a.k.a {" "}
						{aliases.map(el => el.name).join(', ')}
					</small>

					<br />

					<p dangerouslySetInnerHTML={{ __html: bio }} />

					{tags.map(el => (
						<React.Fragment>
							<Badge key={el} color="secondary">{el}</Badge>
							{" "}
						</React.Fragment>
					))}
				</Media>
			</Media>

			<br />

			<Alert color={ended ? 'danger' : 'success'}>
				{begin} {end && `- ${end}`}
      </Alert>
		</React.Fragment>
  );
};

export default MediaComponent;
