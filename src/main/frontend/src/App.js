import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main/Main';
import DoLogin from './DoLogin/DoLogin';
import Social from './Join/Social';
import Join from './Join/Join';
import Find from './Join/Find';
import Terms from './Join/Terms';
import Setting from './Setting/Setting';
import Home from './Home/Home';
import Write from './Write/Write';
import Board from './Board/Board';
import Create from './Board/Create';
import Edit from './Board/Edit';
import PostView from './Board/PostView';
import PublicRoute from './Lib/PublicRoute';
import PrivateRoute from './Lib/PrivateRoute';
import Friend from './Friend/Friend';
import SCalCreate from './SCAL/SCalCreate';
import SCalHome from './SCAL/SCalHome';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<PublicRoute><Main /></PublicRoute>}/>
                <Route path='/doLogin' element={<PublicRoute><DoLogin /></PublicRoute>}/>
                <Route path='/social' element={<PublicRoute><Social /></PublicRoute>}/>
                <Route path='/terms' element={<PublicRoute><Terms /></PublicRoute>}/>
                <Route path='/join' element={<PublicRoute><Join /></PublicRoute>}/>
                <Route path='/find' element={<PublicRoute><Find /></PublicRoute>}/>
                <Route path="/setting" element={<PrivateRoute><Setting /></PrivateRoute>}/>
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}/>
                <Route path="/friend" element={<PrivateRoute><Friend /></PrivateRoute>}/>
                <Route path="/write/:date" element={<PrivateRoute><Write /></PrivateRoute>}/>
                <Route path="/board" element={<PrivateRoute><Board /></PrivateRoute>}/>
                <Route path="/board/create" element={<PrivateRoute><Create /></PrivateRoute>}/>
                <Route path="/edit/:no" element={<PrivateRoute><Edit /></PrivateRoute>}/>
                <Route exact path='/board/post_view/:no' element={<PrivateRoute><PostView /></PrivateRoute>}/>
                <Route path="/scal/create" element={<PrivateRoute><SCalCreate /></PrivateRoute>}/>
                <Route path="/scal/home" element={<PrivateRoute><SCalHome /></PrivateRoute>}/>
            </Routes>
        </Router>
    );
}

export default App;
