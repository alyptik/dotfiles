import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { PropTypes, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { registerScrollListener, unregisterScrollListener } from './utils/onScroll';
import { getHeight, getPositionFromTop, getScrollTop } from './utils/dimensions';

var WindowScroller = function (_PureComponent) {
  _inherits(WindowScroller, _PureComponent);

  function WindowScroller(props) {
    _classCallCheck(this, WindowScroller);

    // Handle server-side rendering case
    var _this = _possibleConstructorReturn(this, (WindowScroller.__proto__ || _Object$getPrototypeOf(WindowScroller)).call(this, props));

    var height = typeof window !== 'undefined' ? getHeight(props.scrollElement || window) : 0;

    _this.state = {
      height: height,
      isScrolling: false,
      scrollTop: 0
    };

    _this._onResize = _this._onResize.bind(_this);
    _this.__handleWindowScrollEvent = _this.__handleWindowScrollEvent.bind(_this);
    _this.__resetIsScrolling = _this.__resetIsScrolling.bind(_this);
    return _this;
  }

  // Can’t use defaultProps for scrollElement without breaking server-side rendering


  _createClass(WindowScroller, [{
    key: 'updatePosition',
    value: function updatePosition(scrollElement) {
      var onResize = this.props.onResize;
      var height = this.state.height;


      scrollElement = scrollElement || this.props.scrollElement || window;
      this._positionFromTop = getPositionFromTop(ReactDOM.findDOMNode(this), scrollElement);

      var newHeight = getHeight(scrollElement);
      if (height !== newHeight) {
        this.setState({
          height: newHeight
        });
        onResize({
          height: newHeight
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var scrollElement = this.props.scrollElement || window;

      this.updatePosition(scrollElement);

      registerScrollListener(this, scrollElement);

      window.addEventListener('resize', this._onResize, false);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var scrollElement = this.props.scrollElement || window;
      var nextScrollElement = nextProps.scrollElement || window;

      if (scrollElement !== nextScrollElement) {
        this.updatePosition(nextScrollElement);

        unregisterScrollListener(this, scrollElement);
        registerScrollListener(this, nextScrollElement);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      unregisterScrollListener(this, this.props.scrollElement || window);

      window.removeEventListener('resize', this._onResize, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;
      var _state = this.state,
          isScrolling = _state.isScrolling,
          scrollTop = _state.scrollTop,
          height = _state.height;


      return children({
        height: height,
        isScrolling: isScrolling,
        scrollTop: scrollTop
      });
    }
  }, {
    key: '_onResize',
    value: function _onResize(event) {
      this.updatePosition();
    }

    // Referenced by utils/onScroll

  }, {
    key: '__handleWindowScrollEvent',
    value: function __handleWindowScrollEvent(event) {
      var onScroll = this.props.onScroll;


      var scrollElement = this.props.scrollElement || window;
      var scrollTop = Math.max(0, getScrollTop(scrollElement) - this._positionFromTop);

      this.setState({
        isScrolling: true,
        scrollTop: scrollTop
      });

      onScroll({
        scrollTop: scrollTop
      });
    }

    // Referenced by utils/onScroll

  }, {
    key: '__resetIsScrolling',
    value: function __resetIsScrolling() {
      this.setState({
        isScrolling: false
      });
    }
  }, {
    key: 'scrollElement',
    get: function get() {
      return this.props.scrollElement || window;
    }
  }]);

  return WindowScroller;
}(PureComponent);

WindowScroller.defaultProps = {
  onResize: function onResize() {},
  onScroll: function onScroll() {}
};
export default WindowScroller;
process.env.NODE_ENV !== "production" ? WindowScroller.propTypes = {
  /**
   * Function responsible for rendering children.
   * This function should implement the following signature:
   * ({ height, isScrolling, scrollTop }) => PropTypes.element
   */
  children: PropTypes.func.isRequired,

  /** Callback to be invoked on-resize: ({ height }) */
  onResize: PropTypes.func.isRequired,

  /** Callback to be invoked on-scroll: ({ scrollTop }) */
  onScroll: PropTypes.func.isRequired,

  /** Element to attach scroll event listeners. Defaults to window. */
  scrollElement: PropTypes.any
} : void 0;