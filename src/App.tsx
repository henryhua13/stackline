import { useState } from 'react';
import stacklineLogo from './stackline_logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators, State, Product, Action } from './state';
import { Dispatch } from 'redux';
import * as data from './stackline_frontend_assessment_data_2021.json';
import SalesTable from './SalesTable';
import Chip from '@mui/material/Chip';

function App() {

  const dispatch = useDispatch();

  const { selectProduct } = bindActionCreators(actionCreators, dispatch);
  const product = useSelector((state: State) => state.product);

  const [mounted, setMounted] = useState(false);

  if (!mounted) {
    setMounted(true);
    getProduct(selectProduct);
  }

  return (
    <div className="App">
      <img src={stacklineLogo} className="Stackline-logo" alt="stackline logo" />
      <div className="Top-bar"></div>
      <div className="Page-content">
        <div className="Product-info">
          <img src={product.image} className="Product-image" alt="product" />
          <h3>{product.title}</h3>
          <div className='Product-subtitle'>{product.subtitle}</div>
          <div className="Tags">{product.tags.map((tag) => {
            return (
              <Chip label={tag} variant="outlined" />
            );
          })}
          </div>
        </div>
        <SalesTable product={product} />
      </div>
    </div>
  );
}

function getProduct(selectProduct: (product: Product) => (dispatch: Dispatch<Action>) => void) {
  const dataJSON = JSON.parse(JSON.stringify(data));
  selectProduct(dataJSON[0]);
}

export default App;
