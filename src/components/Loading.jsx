import Spinner from 'react-bootstrap/Spinner';
import React, { useState, useEffect } from "react";
import "./loading.scss";
export function Loading() {
  return (
		<div>
			<Spinner animation="border" role="status" className="spiImage">
      <span className="visually-hidden">Loading...</span>
			</Spinner>
			<p>Loading中...</p>
		</div>
  );
}
