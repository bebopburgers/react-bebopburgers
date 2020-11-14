import React from 'react';
import './index.css';
import Card from "../card";

const Category = function (props) {
    const { categories, title, onSelect } = props;

    return (
        <div className="group-box">
            <div className="group-box-content">
                {categories.map(category =>
                    <div key={`${category.id}${category.name}`}>
                        <h1 className="category-title">{category.name}</h1>
                        <div className="group-products">
                            {category.products.map(pr => <Card key={`${pr.id}${pr.name}`} {...pr} onSelect={onSelect}/>)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Category;