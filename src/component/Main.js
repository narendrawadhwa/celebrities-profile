import React, { Component } from 'react';
import './Accordion.css';
import { BsSearch, BsTrash } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown, MdOutlineModeEditOutline } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { AiOutlineCheckCircle } from "react-icons/ai";


class CelebrityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      celebrities: [],
      searchQuery: '',
      expandedAccordionId: null,
      celebrityToDelete: null,
    };
  }

  toggleAccordion = (celebrity) => {
    const { expandedAccordionId } = this.state;
    const accordionId = celebrity.id === expandedAccordionId ? null : celebrity.id;

    this.setState({ expandedAccordionId: accordionId });
  };

  componentDidMount() {
    fetch('celebrities.json', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((celebrity) => {
          celebrity.age = this.calculateAge(celebrity.dob);
          celebrity.editMode = false;
        });

        this.setState({ celebrities: data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    } else {
      return age;
    }
  };

  toggleEditMode = (celebrity) => {
    const updatedCelebrities = this.state.celebrities.map((c) =>
      c.id === celebrity.id ? { ...c, editMode: !c.editMode } : c
    );

    this.setState({ celebrities: updatedCelebrities });
  };

  handleAgeChange = (celebrity, newAge) => {
    const updatedCelebrities = this.state.celebrities.map((c) =>
      c.id === celebrity.id ? { ...c, age: newAge } : c
    );

    this.setState({ celebrities: updatedCelebrities });
  };

  handleGenderChange = (celebrity, newGender) => {
    const updatedCelebrities = this.state.celebrities.map((c) =>
      c.id === celebrity.id ? { ...c, gender: newGender } : c
    );

    this.setState({ celebrities: updatedCelebrities });
  };

  handleCountryChange = (celebrity, newCountry) => {
    const updatedCelebrities = this.state.celebrities.map((c) =>
      c.id === celebrity.id ? { ...c, country: newCountry } : c
    );

    this.setState({ celebrities: updatedCelebrities });
  };

  handleDescriptionChange = (celebrity, newDescription) => {
    const updatedCelebrities = this.state.celebrities.map((c) =>
      c.id === celebrity.id ? { ...c, description: newDescription } : c
    );

    this.setState({ celebrities: updatedCelebrities });
  };

  handleFirstChange = (celebrity, newFirst) => {
    const updatedCelebrities = this.state.celebrities.map((c) =>
      c.id === celebrity.id ? { ...c, first: newFirst } : c
    );

    this.setState({ celebrities: updatedCelebrities });
  };

  handleLastChange = (celebrity, newLast) => {
    const updatedCelebrities = this.state.celebrities.map((c) =>
      c.id === celebrity.id ? { ...c, last: newLast } : c
    );

    this.setState({ celebrities: updatedCelebrities });
  };

  cancelEdit = (celebrity) => {
    const updatedCelebrities = this.state.celebrities.map((c) =>
      c.id === celebrity.id ? { ...c, editMode: false } : c
    );
  
    this.setState({ celebrities: updatedCelebrities });
  };

  saveChanges = (celebrity, newAge, newGender, newCountry, newDescription, newFirst, newLast) => {
    const { celebrities } = this.state;

    const index = celebrities.findIndex((c) => c.id === celebrity.id);

    if (index !== -1) {
      const updatedCelebrity = { ...celebrities[index] };
      updatedCelebrity.age = newAge;
      updatedCelebrity.gender = newGender;
      updatedCelebrity.country = newCountry;
      updatedCelebrity.description = newDescription;
      updatedCelebrity.first = newFirst;
      updatedCelebrity.last = newLast;

      const updatedCelebrities = [...celebrities];
      updatedCelebrities[index] = updatedCelebrity;

      this.setState({ celebrities: updatedCelebrities });

      this.toggleEditMode(celebrity);
    }
  };


  openDeleteModal = (celebrity) => {
    this.setState({ celebrityToDelete: celebrity });
  };

  handleDelete = () => {
    const { celebrities, celebrityToDelete } = this.state;

    if (celebrityToDelete) {
      const updatedCelebrities = celebrities.filter((celeb) => celeb.id !== celebrityToDelete.id);

      this.setState({
        celebrities: updatedCelebrities,
        celebrityToDelete: null,
      });
    }
  };

  closeDeleteModal = () => {
    this.setState({
      celebrityToDelete: null,
    });
  };

  render() {
    const { celebrities, searchQuery, celebrityToDelete, expandedAccordionId } = this.state;

    const filteredCelebrities = celebrities.filter((celeb) =>
      `${celeb.first} ${celeb.last}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="celebrity-list" style={{ margin: '15px 20%' }}>
        <div className="search-bar">
          <BsSearch />
          <input
            type="text"
            placeholder="Search user"
            value={searchQuery}
            onChange={this.handleSearchChange}
            style={{ border: 'none', outline: '0', marginLeft: '10px' }}
          />
        </div>
        <div className="accordion-list">
          {filteredCelebrities.map((celebrity) => (
            <div key={celebrity.id} className="accordion">
              <div className="accordion-header">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={celebrity.picture} alt={celebrity.first} className="avatar" />
                  {celebrity.editMode ? (
                    <div style={{ marginLeft: '20px' }}>
                      <input
                        type="text"
                        style={{width:'150px', marginRight:'25px'}}
                        value={celebrity.first}
                        onChange={(e) => this.handleFirstChange(celebrity, e.target.value)}
                      />
                      <input
                        type="text"
                        style={{width:'150px'}}
                        value={celebrity.last}
                        onChange={(e) => this.handleLastChange(celebrity, e.target.value)}
                      />
                    </div>
                  ) : (
                    <span style={{ marginLeft: '20px' }}>{celebrity.first} {celebrity.last}</span>
                  )}
                </div>
                <span
                  className={`arrowDown ${expandedAccordionId === celebrity.id ? 'active' : ''}`}
                  onClick={() => this.toggleAccordion(celebrity)}
                  style={{ fontSize: '32px', color: '#ccc' }}
                >
                  <MdOutlineKeyboardArrowDown />
                </span>

              </div>

              <div className={`accordion-content ${expandedAccordionId === celebrity.id ? 'active' : ''}`}>
                {celebrity.editMode ? (
                  <div>
                    <div className='secondRow'>
                    <div style={{ marginRight: '30px', display:'flex', flexDirection:'column' }}>
                        <span className='heading'>Age</span> <input type="text" style={{width:'70px' }} value={celebrity.age} onChange={(e) => this.handleAgeChange(celebrity, e.target.value)} />
                      </div>
                      <div style={{ marginRight: '30px', display:'flex', flexDirection:'column' }}>
                      <span className='heading'>Gender</span>
                        <select style={{ width:'150px'}} value={celebrity.gender} onChange={(e) => this.handleGenderChange(celebrity, e.target.value)}>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Rather not say">Rather not say</option>
                        </select>
                      </div>
                      <div style={{ marginRight: '30px', display:'flex', flexDirection:'column' }}>
                      <span className='heading'>Country </span>
                        <input style={{ width:'150px'}} type="text" value={celebrity.country} onChange={(e) => this.handleCountryChange(celebrity, e.target.value)} />
                      </div>
                    </div>
                    <div style={{fontSize:'16px', display:'flex', flexDirection:'column'}}>
                      <span className='heading'>Description</span>
                      <textarea
                        value={celebrity.description}
                        onChange={(e) => this.handleDescriptionChange(celebrity, e.target.value)}
                        style={{ width: '95%', height: '120px' }} />
                    </div>
                    <div style={{display:'flex', justifyContent:'flex-end', margin:'7px 0px'}}>
                    <button className='btn' style={{color:'red'}} onClick={() => this.cancelEdit(celebrity)}><RxCrossCircled/></button>
                    <button className='btn' style={{color:'green'}} onClick={() => this.saveChanges(celebrity)}><AiOutlineCheckCircle/></button>
                  </div>
                  </div>
                ) : (
                  <div>
                    <div className='secondRow'>
                      <div style={{ marginRight: '30px', display:'flex', flexDirection:'column' }}>
                       <span className='heading'>Age</span>  {celebrity.age} Years</div>
                       <div style={{ marginRight: '30px', display:'flex', flexDirection:'column' }}>
                       <span className='heading'>Gender</span> {celebrity.gender.charAt(0).toUpperCase() + celebrity.gender.slice(1)}
                      </div>
                      <div style={{ display:'flex', flexDirection:'column' }}>
                      <span className='heading'>Country</span> {celebrity.country}</div>
                    </div>
                    <div style={{fontSize:'16px', display:'flex', flexDirection:'column'}}>
                      <span className='heading'>Description</span>
                      {celebrity.description}</div>
                      <div style={{display:'flex', justifyContent:'flex-end', margin:'7px 0px'}}>
                    <button className='btn' style={{color:'red'}} onClick={() => this.openDeleteModal(celebrity)}><BsTrash/></button>
                    <button className='btn' style={{color:'blue'}} onClick={() => this.toggleEditMode(celebrity)}><MdOutlineModeEditOutline /></button>
                  </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>


        {celebrityToDelete && (
      <div className="custom-modal">
      <div className="modal-content">
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}> 
        <h4>Are you sure you want to delete?</h4>
        <button className="close-button" onClick={this.closeDeleteModal}>
          &times;
        </button>
        </div>
        <div className="modal-buttons">
          <button onClick={this.closeDeleteModal}>Cancel</button>
          <button style={{ color: 'white', marginLeft: '30px', background: '#ff3d00' }} onClick={this.handleDelete}>Delete</button>
        </div>
      </div>
    </div>
    
        )}
      </div>
    );
  }
}

export default CelebrityList;
