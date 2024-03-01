import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { ResizableComponent } from './components/Resizable';
import axios from 'axios';
import { baseurl } from './constants';

const App = () => {
  const [count, setCount] = useState(0);
  const [latestDocument, setLatestDocument] = useState({ content: '', id: '' });

  // get total count
  const getCount = async () => {
    try {
      const response = await axios.get(`${baseurl}/count`);
      setCount(response?.data?.count);
    } catch (error) {
      console.error('Error fetching count:', error);
    }
  };

  const getLatestDocument = async () => {
    try {
      const response = await axios.get(`${baseurl}/latest`);
      setLatestDocument({ content: response?.data?.content, id: response?.data?._id });
    } catch (error) {
      console.error('Error fetching latest document:', error);
    }
  };

  const handleUpdate = useCallback(async (content, id) => {
    try {
      await axios.put(`${baseurl}/update`, { content, id });
      // Fetch the latest document after updating
      getLatestDocument();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }, [getLatestDocument]);

  // add new document
  const handleAdd = useCallback(async () => {
    let payload={}
    try {
      await axios.post(`${baseurl}/add`, { content: payload });
      // Fetch new count after adding data
      getCount();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  }, [getCount]);


  useEffect(() => {
    getCount();
    getLatestDocument();
  }, []);


  return (
    <div className="app-container">
      <div className="row">
        <ResizableComponent add={handleAdd} latestDocument={latestDocument} count={count} handleUpdate={handleUpdate} />
        <ResizableComponent add={handleAdd} latestDocument={latestDocument} count={count} handleUpdate={handleUpdate} />
      </div>
      <ResizableComponent add={handleAdd} latestDocument={latestDocument} count={count} handleUpdate={handleUpdate} />
    </div>
  );
};

export default App;
