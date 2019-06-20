

let app = {
    names : new Set(),
    init : function(){
        HTMLCollection.prototype.forEach = function(action){
            Array.prototype.slice.call(this).forEach(
                item => action(item)
            )
        }
        
        String.prototype.hasHTML = function(){
            return this.indexOf('<') > -1
        }

        document.getElementsByTagName("tr").forEach(item => {
            let cols = item.getElementsByTagName("td")
            cols.length == 5 ? (
                app.getNames(cols[0].innerHTML)
            ) : null
        })

        return app.toJSON()
    },
    getNames : function(text){
        if (text.hasHTML()) return
        text = text.substring(text.lastIndexOf("("),text.length)
        text = text.replace(/[( )]/g,"")
        text.split(",").forEach(
            name => app.names.add(name)
        )
    },
    toJSON : function(){
        return JSON.stringify([...app.names]);
    }
}

console.log(app.init())