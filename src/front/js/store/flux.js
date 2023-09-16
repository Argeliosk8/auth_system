const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			user: null

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			signup: async(new_user)=>{
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify(new_user)
					})
					if(!resp.ok) throw Error('There was a problem with your registration')
					const data = await resp.json()
					return data

				} catch (error) {
					console.log(error)
				}
			},

			login: async(email, pwd)=>{
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify({"email": email, "password": pwd})
					})
					if(!resp.ok) throw Error('There was a problem verifying your credentials')
					const data = await resp.json()
					localStorage.setItem('jwt-token', data.token)
					setStore({
						user: data.user
					})
					return data
				} catch (error) {
					console.log(error)
				}
			},

			logout: ()=>{
				localStorage.removeItem("jwt-token")
				setStore({
					user: null
				})
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
