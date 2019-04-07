import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {

  static contextTypes = {
    router : PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props)
    .then(() => {
        this.context.router.push('/');
     });
  }

  render(){
    const { fields: { title, categories, content}, handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
        <h3>Create A New Post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger':''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title}/>
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger':''}`}>
          <label>Catagories</label>
          <input type="text" className="form-control" {...categories}/>
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger':''}`}>
          <label>Content</label>
          <textarea className="form-control" {...content}/>
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link className=" btn btn-danger" to="/">
          Cancel
        </Link>
      </form>
    );
  }
}

function validate(values){
  const errors = {};
  if(!values.title) {
    errors.title = 'Enter a title';
  }
  if(!values.categories) {
    errors.categories = 'Enter Catagories';
  }
  if(!values.content) {
    errors.content = 'Enter some content';
  }
  return errors;
}

//reducform is similar to connect
//connect : 1st argument is mapStateToProps 2nd arg is mapDispatchToProps
//reduxForm : 1st arg is config object , 2nd is mapStateToProps and 3rd is mapDispatchToProps

export default reduxForm({
  form : 'PostsNewForm',
  fields : ['title', 'categories', 'content'],
  validate
}, null, {createPost})(PostsNew);
