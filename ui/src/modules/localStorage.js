import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'
import PouchDbQuickSearch from 'pouchdb-quick-search'

PouchDB.plugin(PouchDBFind)
PouchDB.plugin(PouchDbQuickSearch)

//convenience function do get individual error handling for an array of Promises
const to = promise =>
	promise.then(data => [null, data])
		   .catch(err => [err])

const getLocalStorage = name => {

	const ls = new PouchDB(name, {
		auto_compaction: true,
		revs_limit: 1
	})

	ls.fetchUI = () =>
		ls.find({ selector : { type : 'ui' } })

	ls.exists = async selector => {

		const results = await ls.find({ selector : { ...selector } })
		return (results.docs.length > 0)
	}

	//wrapper around insert so that if there is an initial failure,
	//puts until max attempts reached
	ls.insert = async (doc, attempt) => {

		let err, res

		[err, res] = await to(ls.post(doc))
		//cancel after n attempts
		if (err) {

			let latest = await ls.get(doc._id)

			if (!latest) {
				latest = await ls.find({ selector : { _id : doc._id } })
			}

			doc._rev = latest.rev
			if ( attempt < 5 )
				ls.insert(doc, attempt ? 0 : attempt + 1)
		}
		return (res.rev)
	}

	//convenience method to delete multiple items at once
	// by adding '_.deleted' property and updating them
	ls.deleteAll = items => {
		items.forEach(item => item._deleted = true)
		return (ls.bulkDocs(items))
	}

	return (ls)
}

export default getLocalStorage