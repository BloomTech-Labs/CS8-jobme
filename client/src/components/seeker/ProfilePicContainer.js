import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';

import placeholder from '../../images/placeholder.png';
import { updateUserPic } from '../../actions';
import { DropzoneContainer, ProfilePic, Button } from '../styles';

class ProfilePicContainer extends Component {
    state = {
        showUploader: false,
    }

    toggle = () => {
        const { showUploader }  = this.state;
        this.setState({
          showUploader: !showUploader
        });
    }
    
    handleDrop = files => {
        const file = files[0];
        this.props.updateUserPic(file, )
    }

    render() {
        if (this.state.showUploader) {
            return (
                <DropzoneContainer> 
                    <Dropzone 
                        onDrop={this.handleDrop.bind(this)} 
                        multiple={false}
                        accept="image/*"
                        style={{
                            'border': '2px dashed black',
                            'border-radius': '50%',
                            'height': '300px',
                        }}
                    > Drag file here or click to browse.
                    </Dropzone>
                    <Button onClick={() => this.toggle()}>Cancel</Button>
                </DropzoneContainer>
            );
        }
        return <DropzoneContainer onClick={() => this.toggle()}>
            <ProfilePic
                src={this.props.profile.imgUrl || placeholder}
            />
        </DropzoneContainer>
    }
}

export default connect(null, { updateUserPic })(ProfilePicContainer);