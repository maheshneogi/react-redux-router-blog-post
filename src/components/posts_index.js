import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
  componentWillMount (){
    this.props.fetchPosts();
  }

  renderPosts() {
    return this.props.posts.map((post) => {
      return (
        <li className="list-group-item" key ={post.id}>
          <Link to={"posts/"+post.id}>
            <span className="pull-xs-right">{post.categories}</span>
            <strong>{post.title}</strong>
          </Link>
        </li>
      );
    });
  }

  render (){
    return (
      <div>
        <div className="text-xs-right">
            <Link className=" btn btn-primary" to="/posts/new">
              Add a Post
            </Link>
        </div>
        <h3>Posts</h3>
        <ul className = "list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts : state.posts.all
  }
}

//to remove this boiler plate we can use different syntax in export
/*function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchPosts}, dispatch);
}

export default connect(null, mapDispatchToProps)(PostsIndex);*/

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
