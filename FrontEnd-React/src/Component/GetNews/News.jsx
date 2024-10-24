import React, { useEffect, useState } from 'react';

import { Card ,Button, Modal, Form} from 'react-bootstrap';
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';



export default function News() {
const [news,setNews]=useState([]);
const Navigate= useNavigate();
const [showModal, setShowModal] = useState(false);
const [selectedNews, setSelectedNews] = useState(null);
const [newMainImage, setNewMainImage] = useState(null); 
const [newImages, setNewImages] = useState([]); 
const [title, setTitle] = useState('');
const [body, setBody] = useState('');

    const getAllNews=()=>{
        axios.get('http://localhost:3000/news').then((response)=>{
            console.log(response.data.news);
            setNews(response.data.news)
        }).catch((error)=>{
            console.log(error);
            
        })
    }
    const handleNewsClick = (selectedNews) => {
      
        Navigate('/details', { state: { title: selectedNews.title, images: selectedNews.images,body:selectedNews.body } });
      };
      const handleDelete = (id) => {
  
        
        axios.delete(`http://localhost:3000/news/${id}`)
          .then((response) => {
            console.log(response.data.message);
          
            getAllNews();
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
  const handleUpdateShow = (newsItem) => {
    setSelectedNews(newsItem); 
    setShowModal(true); 
    setNewMainImage(null); 
  };
    
 
    

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
  };
  const handleModalOpen = (newsItem = null) => {
    setSelectedNews(newsItem);
    setShowModal(true);
    
    if (newsItem) {
      // If editing, set the fields with existing data
      setTitle(newsItem.title);
      setBody(newsItem.body);
      setNewMainImage(null);
      setNewImages([]);
    } else {
      // If adding, reset the fields
      setTitle('');
      setBody('');
      setNewMainImage(null);
      setNewImages([]);
    }
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleAddOrUpdateNews = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    if (newMainImage) {
      formData.append('mainImg', newMainImage);
    }
    newImages.forEach((image) => {
      formData.append('images', image); // Append each image to the form data
    });

    if (selectedNews) {
      // Update existing news
      axios.put(`http://localhost:3000/news/${selectedNews._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          console.log(response.data.message);
          getAllNews(); // Refresh the news list after updating
          handleModalClose(); // Close the modal
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Add new news
      axios.post('http://localhost:3000/news', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          console.log(response.data.message);
          getAllNews(); // Refresh the news list after adding
          handleModalClose(); // Close the modal
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

    useEffect(()=>{
        getAllNews()
    },[])
    return (
        <>
        <div>
        <Button variant="primary" onClick={() => handleModalOpen()} className="mb-3">
          Add News
        </Button>
        <div className="container-fluid vh-100 d-flex  justify-content-center align-items-center  flex-wrap    " >
          {news.map((newItem) => (
            <div className="news col-4  " key={newItem.id}>
              <Card style={{ width: '18rem' }} className=' m-auto my-2'>
              <Card.Img variant="top" src={newItem?.mainImg} alt="News Image" style={{height:'10rem', objectFit:'cover'}} />
                <Card.Body>
                  <Card.Title>{newItem?.title}</Card.Title>
                  <Card.Text className='card-text'>
                    {newItem?.body || '  Here is a brief description of the news article.'}
                  
                  </Card.Text>
                  <div className='d-flex justify-content-between'>
                  <Button variant="primary" onClick={()=>handleNewsClick(newItem)}>Read More</Button>
                  <Button variant="warning" onClick={() => handleModalOpen(newItem)}>Update</Button>

                  <Button variant="danger" onClick={() => handleDelete(newItem?._id)}>Delete</Button>
                  </div>
                  
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedNews ? 'Update News' : 'Add News'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddOrUpdateNews}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Body</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Main Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewMainImage(e.target.files[0])}
                  required={!selectedNews} // Required only when adding
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Additional Images</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
                <Form.Text className="text-muted">
                  You can upload multiple images here.
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">
                {selectedNews ? 'Update News' : 'Add News'}
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
      
        </>

      );
      
}
