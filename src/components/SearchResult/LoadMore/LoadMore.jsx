import React, { useEffect, useState } from "react";
// import PureRenderMixin from "react-addons-pure-render-mixin";
import "./LoadMore.styles.scss";

export default function LoadMore(props) {
  //   //下拉加载更多的方法
  //   useEffect(() => {
  //     // 使用滚动时自动加载更多
  //     const loadMoreFn = this.props.loadMoreFn;
  //     const wrapper = this.refs.wrapper;
  //     let timeoutId;
  //     function callback() {
  //       const top = wrapper.getBoundingClientRect().top;
  //       const windowHeight = window.screen.height;
  //       if (top && top < windowHeight) {
  //         // 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
  //         loadMoreFn();
  //       }
  //     }
  //     window.addEventListener(
  //       "scroll",
  //       function () {
  //         if (this.props.isLoadingMore) {
  //           return;
  //         }
  //         if (timeoutId) {
  //           clearTimeout(timeoutId);
  //         }
  //         timeoutId = setTimeout(callback, 50);
  //       }.bind(this),
  //       false
  //     );
  //   }, []);

  return (
    <div className="load-more">
      {props.isLoadingMore ? (
        <span>Loading...</span>
      ) : (
        <span onClick={props.loadMoreFn}>Load More...</span>
      )}
    </div>
  );
}
