import { useEffect, useRef, useState } from "react";

import "./App.css"

function App() {
  const [photos, setPhotos] = useState([])
  const [bestTags, setBestTags] = useState([])
  const [page, setPage] = useState(1)

  const selectedTag = useRef("");

  useEffect(() => {
    getPhotos(page, 10);
  }, [page])

  const getPhotos = (page, perPage, tag = selectedTag.current) => {
    fetch(`http://localhost:8080/api/photos?page=${page}&perPage=${perPage}&tag=${tag}`)
    .then((res) => res.json())
    .then(({ data }) => {
      findAndSetBestTags(data);
      setPhotos(data);
    })
  }

  function findAndSetBestTags(data) {
    const topTagsStore = data.reduce((tagStore, photo) => {
      const tags = getTags(photo.tags);

      for(let i = 0; i < tags.length; i++) {
        const tag = tags[i];

        if (!tag) continue;

        tagStore[tag] = tagStore[tag] ? tagStore[tag] + 1 : 1
      }

      return tagStore;
    }, {})

    const sorted = Object.entries(topTagsStore).sort(([tag, count], [prevTag, prevCount]) => count > prevCount ? -1 : 1)

    setBestTags(sorted.slice(0, 10).map(([tag]) => tag));
  }

  const getTags = (tags) => {
    return tags.split(" ");
  }

  const selectTag = (tag = selectedTag.current) => {
    selectedTag.current = tag;
    setPage(1)
    getPhotos(1, 10, tag);
  }

  const deletePhoto = (photoId) => {
    fetch(`http://localhost:8080/api/photos?photoId=${photoId}`, { method: 'DELETE', })
    .then((res) => res.json())
    .then(() => {
      getPhotos(page, 10)
    })
  }

  const changePage = (newPage) => {
    newPage = newPage < 1 ? 1 : newPage;
    newPage = newPage > page && photos.length < 10 ? page : newPage;

    getPhotos(newPage, 10);
  }

  return (
    <div className="App">
      <div className="photos-container">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-container">
            <div className="tags">
              {bestTags.map((item, index) => (
                <span key={index} onClick={() => selectTag(item)}>{item}</span>
              ))}
            </div>
            <img src={photo.url} />
            <span>Published: {new Date(photo.publishedDate).toDateString()}</span>
            <button onClick={() => deletePhoto(photo.id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => changePage(page - 1)}>&lt;</button>
        <span>{page}</span>
        <button onClick={() => changePage(page + 1)}>&gt;</button>
      </div>
    </div>
  );
}

export default App;
